const { faker } = require('@faker-js/faker');
const users = require('./users');
const videos = [];

for(let i = 0; i < faker.datatype.number({min: 10, max:15}); i++) {
    let creator = (i < 4) ?  1 :
        users[faker.datatype.number(users.length-1)].id;

    const url = faker.internet.url();

    videos.push({
        id: i + 1,
        url, name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        creator
    });
}

module.exports = videos;
