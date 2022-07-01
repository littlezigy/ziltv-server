// Creators can assign badges to users that hold a certain badge
const dal = require('./dal/badge.dal');
const sessionManager = require('./session');
const { UnauthorizedError, ClientError } = require('./errors');

module.exports = {
    assignBadge(data, reqObj) {
        const creator = sessionManager.get(reqObj)

        if(creator) {
            return dal.save({...data, creator})
                .then(res => {
                    return {
                        id: res
                    };
                });
        } else throw new UnauthorizedError('Not authenticated');
    },

    fetchCreatorBadges(reqObjOrID) {
        let id;

        if(typeof reqObjOrID == 'number' || typeof reqObjOrID == 'string')
            id = reqObjOrID
        else {
            id = sessionManager.get(reqObjOrID)

            if(!id)
                return Promise.reject(new UnauthorizedError('You need to be authenticated to call this route. Please login'));
        }

        return dal.fetchByCreator(id)
    },

    fetchBadgeConfig(data) {
        let fetchFn
        /*
        if(data.video)
            fetchFn = userDal.fetchByVideo(video)
        else fetchFn = dal.fetchByID(data.id)
        */
        fetchFn = dal.fetchByID(data.id)

        return fetchFn
            .then(res => {
                let specifyTokens = res.specifyTokens == false ? false :
                    res.specifyTokens;

                return {
                    ...res,
                    specifyTokens
                }
            });
    }
}
