// Creators can assign badges to users that hold a certain badge
const dal = require('./dal/badge.dal');

module.exports = {
    assignBadge(data) {
        console.log("D", data);
        return dal.save(data)
            .then(res => {
                return {
                    id: res
                };
            });
    },

    fetchCreatorBadges(id) {
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
