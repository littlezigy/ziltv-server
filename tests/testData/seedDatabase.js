const users = require('./users');
const badges = require('./badges');
const videos = require('./videos');
const db = require('../../config/database')();

module.exports = function() {
    // Wipe tables
    let promiseChain = db.query('DELETE FROM comments')
        .then(() => db.query('DELETE FROM badges'))
        .then(() => db.query('DELETE FROM videos'))
        .then(() => db.query('DELETE FROM users'))

    Object.values(users).forEach(user => {
        if(user.hasAccount !== false && !user._no_account) {
            let { id, name, username, email, zil_bech32, avatar, links, bio, shortBio } = user;
            if(name && name.includes('\''))
                name = name.replace(/'/, '\\\'');
            zil_bech32 = zil_bech32.toLowerCase()

            const data = [id, name, email, username, avatar, JSON.stringify(links), zil_bech32, shortBio, bio];

            let query = `INSERT INTO users(_id, name, email, username, avatar, links, bech32_address, short_bio, bio) VALUES('${ data.join("', '") }');`;

            promiseChain = promiseChain.then(() => db.query(query))
                .catch(e => console.log('ERROR:', e, '\nQuery:', query));
        }
    });

    Object.values(videos).forEach(video => {
        const query = `INSERT INTO videos(_id, name, description, url, creator) VALUES($1, $2, $3, $4, $5)`;
        const { id, name, description, url, creator } = video;

        const values = [id, name, description, url, creator];
        promiseChain = promiseChain.then(() => db.query(query, values))
            .catch(e => console.log('ERROR:', e, '\nQuery:', query));
    });

    Object.values(badges).forEach(badge => {
        const query = `INSERT INTO badges(name, image_uri, nft_address, specify_token, token_ids, creator) VALUES($1, $2, $3, $4, $5, $6)`
        const {name, imageUrl, nftAddress, specifyToken, tokenIDs, creator} = badge;

        const values = [
            name, imageUrl, nftAddress, specifyToken, tokenIDs, creator
        ]

        promiseChain = promiseChain.then(() => db.query(query, values))
            .catch(e => console.log('ERROR:', e, '\nQuery:', query));
    });

    return promiseChain;
}