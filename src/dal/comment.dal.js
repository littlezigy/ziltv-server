const db = require('../../config/database')();
const { uid } = require('uid');
const table = 'comments';

module.exports = {
    post(videoID, poster, text) {
        const query = `INSERT INTO comments(video, user_, text_) VALUES($1, $2, $3) RETURNING _id as id`;
        const values = [videoID, poster, text];

        return db.query(query, values)
            .then(res => {
                return res.rows[0]
            });
    },

    fetchByID(id) {
        const query = `SELECT _id as id, video, text_ as text, user_ as user FROM comments WHERE _id=$1`;
        const values = [id];
        return db.query(query, values)
            .then(res => {
                res = res.rows[0]
                if(res) {
                    const { text, user, video } = res;
                    return {
                        text,
                        userID: user,
                        videoID: video
                    }
                } else return {}
            });
    }
}

