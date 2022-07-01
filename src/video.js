const dal = require('./dal/video.dal');
const userDal = require('./dal/user.dal');
const badgeDal = require('./dal/badge.dal');
const session = require('./session');
const { UnauthorizedError, ClientError } = require('./errors');

module.exports = {
    post(data, sessionObj) {
        const creator = session.get(sessionObj);
        if(creator) 
            return dal.create({...data, creator});
    },

    edit(id, data, sessionObj) {
        const creator = session.get(sessionObj);
        if(creator)
            return dal.edit(id, data);
    },

    fetch(id) {
        return dal.fetchByID(id)
        .then(res => {
            return badgeDal.fetchByCreator(res.creator)
            .then(badgeConfigs => {
                const creator = {id:res.creator};
                return {...res,creator, badgeConfig: badgeConfigs};
            });
        });
    },

    fetchByCreator(request) {
        const creator = (typeof request == 'number' || typeof request == 'string') ?
            request : session.get(request);

        if(creator) {
            return dal.fetchByCreator(creator)
                .then(res => {
                    return res.map(v => {
                        return {
                            ...v,
                            creator: { id: v.creator }
                        }
                    });
                });
        }
        else return Promise.reject( new ClientError('Invalid user'))
    },

    fetchAll() {
        return dal.fetchAll()
        .then(resArr => {
            const creators = resArr.map(res => res.creator);
            return userDal.fetchByIDs(creators)
            .then(creatorRes => {
                const creatorObj = {}

                creatorRes.forEach(c => {
                    creatorObj[c.id] = c
                });

                return resArr.map(res => {
                    let creator = {id: res.creator}

                    if(creatorObj[res.creator]) {
                        const c = creatorObj[res.creator];
                        creator.name = c.name;
                        creator.username = c.username;
                        creator.avatar = c.avatar
                    }
                    return {...res,creator};
                });
            });
        });
    }
}
