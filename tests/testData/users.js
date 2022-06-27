const users = []
const { faker } = require('@faker-js/faker');

for(let i=0; i<10; i++) {
    const fname = faker.name.firstName().replace('\'', '');
    const lname = faker.name.lastName().replace('\'', '');
    const name = fname + ' ' + lname;
    const username = faker.internet.userName(fname, lname)
    const email = faker.internet.exampleEmail(fname, lname);
    const zil_bech32 = faker.finance.ethereumAddress();
    const links = Array(faker.datatype.number(5)).fill(1)
        .fill({
            name: faker.lorem.word(),
            url: faker.internet.url()
        });

    const bio = faker.lorem.paragraphs();
    const shortBio = faker.lorem.sentence();
    const avatar = faker.internet.avatar();

    users.push({
        id: i + 1,
        name,
        username,
        email,
        links,
        zil_bech32,
        shortBio, bio, avatar
    });
}

module.exports = users;
