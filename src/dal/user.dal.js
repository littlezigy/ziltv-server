const db = require('../../config/database')();

module.exports = {
    fetch() {
        return Promise.resolve(true);
    },
    fetchByIDs(ids) {
        const query = `SELECT * FROM users where _id in ('${ ids.join("', '") }')`;

        return db.query(query)
            .then(resArr => {
                return resArr.rows.map(res => {
                    const {_id: id, username, password, name, links, avatar, bech32_address, email} = res;
                    return {
                        id, username, password, name, avatar, bech32: bech32_address, email, links
                    }
                });
            });
    },
    fetchByID(id) {
        const query = `SELECT * FROM users where _id=$1`;

        return db.query(query, [id])
        .then(res => {
            res = res.rows;

            if(res.length == 1) {
                res = res[0]
                const {_id: id, username, password, name, links, avatar, email} = res;
                return {
                    id, username, password, name, avatar,email, links
                }
            } else return false;
        });
    },
    fetchByUsername(username) {
        const query = `SELECT * FROM users where username=$1`;

        return db.query(query, [username])
        .then(res => {
            res = res.rows;

            if(res.length == 1) {
                res = res[0]
                const {_id: id, username, password, name, avatar, email} = res;
                return {
                    id, username, password, name, avatar,email
                }
            }
        });
    },
    create({name, username, password}) {
        const query = `INSERT INTO users(name, username, password) VALUES($1, $2, $3) RETURNING *`
        const values = [name, username, password];
        return db.query(query, values)
        .then(res => {
            res = res.rows;

            if(res.length == 1) {
                res = res[0]
                const {_id: id, username} = res;
                return {
                    id, username
                }
            }
        });
    }
}
