const { faker } = require('@faker-js/faker');

const fakeReq = () => JSON.parse(faker.datatype.json());

module.exports = {
    fakeReq
}
