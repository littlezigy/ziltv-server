const db = require('../../config/database')();
const { uid } = require('uid');
const table = 'badges';

module.exports = {
    save(data) {
        const specifyTokens = data.specifyTokens || 'false';
        const name = data.name || 'badge-' + uid();
        let tokenIDs = data.tokenIDs || [];
        tokenIDs = JSON.stringify(tokenIDs);

        const query = `INSERT INTO ${table} (name, image_uri, nft_address, creator, specify_token, token_ids)
        VALUES($1, $2, $3, $4, $5, $6) RETURNING _id as id`;
        const values = [
            name, data.badgeImg, data.nftAddress, data.creator, specifyTokens, tokenIDs
        ];

        return db.query(query, values)
            .then(res => {
                return res.rows[0].id
            });
    },

    fetchByID(id) {
        return db.query('SELECT * from badges where _id  = $1', [id])
            .then(res => {
                res =  res.rows[0];

                return {
                    id: res._id,
                    badgeImg: res.image_uri,
                    nftAddress: res.nft_address,
                    tokenIDs: res.token_ids,
                    creator: res.creator,
                    specifyTokens: res.specify_token
                }
            });
    },

    fetchByCreator(id) {
        return db.query('SELECT * from badges where creator  = $1', [id])
            .then(res => {
                if(res.rows.length > 0) {
                    res = res.rows;

                    return res.map(b => {
                        return {
                            id: b._id,
                            badgeImg: b.image_uri,
                            nftAddress: b.nft_address,
                            tokenIDs: b.tokenIDs,
                            creator: b.creator,
                            specifyTokens: b.specify_token
                        }
                    });

                } else return []
            });
    }
}
