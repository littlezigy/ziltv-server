const { faker } = require('@faker-js/faker');
const users = require('./users');
const badges = [];

for(let i = 0; i < faker.datatype.number({min: 10, max:15}); i++) {
    let creator = (i < 4) ?  1 :
        users[faker.datatype.number(users.length-1)].id;

    const tokenIDs = faker.datatype.number();
    const url = faker.internet.url();

    badges.push({
        imageUrl: faker.internet.avatar(),
        nftAddress: faker.finance.ethereumAddress(),
        specifyToken: 'oneOf',
        tokenIDs,
        creator
    });
}

module.exports = badges;

