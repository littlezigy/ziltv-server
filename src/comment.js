const dal = require('./dal/comment.dal');

module.exports = {
    post(data) {
        const videoID = data.videoID || data.video;
        const poster = data.userID || data.user || data.poster;
        const text = data.text;

        return dal.post(videoID, poster, text)
    },


    fetch(id) {
        return dal.fetchByID(id)
        .then(res => {
            return {
                ...res,
                poster: res.userID
            }
        });
    }
}
