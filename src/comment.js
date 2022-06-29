const dal = require('./dal/comment.dal');
const userDal = require('./dal/user.dal');
const sessionManager = require('./session');
const { UnauthorizedError, ClientError } = require('./errors');

module.exports = {
    post(data, reqObj) {
        const videoID = data.videoID || data.video;
        const poster = sessionManager.get(reqObj);
        const text = data.text;

        if(poster)
            return dal.post(videoID, poster, text)
        else throw new UnauthorizedError('Not authenticated');
    },

    fetch(id) {
        return dal.fetchByID(id)
        .then(res => {
            return {
                ...res,
                poster: res.userID
            }
        });
    },

    fetchByVideo(videoID) {
        return dal.fetchByVideoID(videoID)
            .then(res => {
                return userDal.fetchByIDs(res.map(v => v.userID))
                .then(c_res => {
                    const posters = {};
                    c_res.forEach(c => posters[c.id] = c);

                    return res.map(c => {
                        const p = posters[c.userID];
                        const poster = {
                            id: p.id,
                            name: p.name,
                            bech32: p.bech32,
                        }
                        const video = {id: c.videoID}

                        return {
                            poster, text: c.text, video
                        }
                    });
                });
            });
    }
}
