const db = require('../../config/database')();
const table = 'videos';

module.exports = {
    create(data) {
        const query = `INSERT INTO ${table} (url, creator, name, description, thumbnail_url) VALUES ($1,$2,$3,$4,$5) RETURNING _id`;
        const values = [
            data.url,
            data.creator,
            data.name,
            data.description,
            data.thumbnail
        ]

        return db.query(query, values)
            .then(res => {
                res = res.rows;

                if(res.length >= 1) {
                    res  = res[0];
                    return {id: res._id}
                } else return false;
            });
    },

    edit(id, data) {
        const query = `UPDATE ${table} SET
        url=$2,
            name=$3,
            description=$4
        WHERE _id=$1 RETURNING _id`

        const values = [id, data.url, data.name, data.description];

        return db.query(query, values)
            .then(res => {
                res = res.rows;

                if(res.length >= 1) {
                    res  = res[0];
                    return {id: res._id}
                }
            });
    },

    fetchByID(id) {
        const query = `SELECT * from ${table} WHERE _id=$1`;

        return db.query(query, [id])
            .then(res => {
                res = res.rows;

                if(res.length >= 1) {
                    res  = res[0];
                    const { name, description, creator, url, thumbnail_url}=res;
                    return {id: res._id, name, description, creator, url, thumbnail: thumbnail_url}
                }
                else return {}
            });
    },

    fetchAll() {
        const query = `SELECT * from ${table}`;

        return db.query(query)
            .then(res => {
                return res.rows.map(data => {
                    const {name, description, creator, url, thumbnail_url}=data;
                    console.log( {id: data._id, name, description, creator, url, thumbnail: thumbnail_url});
                    return {id: data._id, name, description, creator, url, thumbnail: thumbnail_url}
                });
            });
    }
}
