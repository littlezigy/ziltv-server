const dal = require('./dal/video.dal');
const badgeDal = require('./dal/badge.dal');
const session = require('./session');

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

    fetchAll() {
        return dal.fetchAll()
        .then(resArr => {
            return resArr.map(res => {
                const creator = {id:res.creator};
                return {...res,creator};
            });
        });
    }
}
