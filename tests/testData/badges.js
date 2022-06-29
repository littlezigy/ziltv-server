const { faker } = require('@faker-js/faker');
const users = require('./users');
const badges = [];
const nfts = ['zil10p7ak8ujnj24ava0r7ckunpvmddwuye4xa48r8',
    'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh',
    'zil1zjsl04m6jmr295lhz3e2hq8ahzrm2u4g5yumqr',

]
const specifyTokens = ['false', 'false']

for(let i = 0; i < faker.datatype.number({min: 10, max:15}); i++) {
    let creator = (i < 4) ?  1 :
        users[faker.datatype.number(users.length-1)].id;

    const tokenIDs = JSON.stringify([...new Set(faker.datatype.number().toString().split(''))]);
    console.log("tokenids:", tokenIDs);
    const url = faker.internet.url();

    badges.push({
        imageUrl: faker.internet.avatar(),
        nftAddress: nfts[i] || faker.finance.ethereumAddress(),
        specifyToken: specifyTokens[i] || 'oneOf',
        tokenIDs,
        creator
    });
}

module.exports = badges;

