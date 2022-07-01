const db = require('../../config/database')();

module.exports = {
    fetch() {
        return Promise.resolve(true);
    },
    fetchByIDs(ids) {
        console.log('ids:', ids);
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
                const {_id: id, username, password, bech32_address, name, links, avatar, email} = res;
                return {
                    id, username, password, bech32: bech32_address, name, avatar,email, links
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
                const {_id: id, username, password, name, links, avatar, bech32_address, email} = res;
                return {
                    id, username, password, name, avatar, bech32: bech32_address, email, links
                }
            }
        });
    },
    create({name, username, avatar, password}) {
        const query = `INSERT INTO users(name, username, avatar, password) VALUES($1, $2, $3, $4) RETURNING *`
        const values = [name, username, avatar, password];
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
