const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const { users } = require('../testData');

const dal = require('../../src/dal/badge.dal');

describe('DAL for badge', function() {
    it('Save and retrieve badge', function() {
        const data = {
            badgeImg: faker.internet.url(),
            creator: users[2].id,
            specifyTokens: 'false',
            nftAddress: faker.finance.ethereumAddress(),
        }

        return dal.save(data)
            .then(res => {
                expect(res).to.be.a('number');
                return dal.fetchByID(res);
            })
            .then(res => {
                expect(res).to.include(data);
            });
    });

    it('FetchByCreator', function() {
        return dal.fetchByCreator(1)
        .then(res => {
            expect(res).to.have.lengthOf.at.least(4);
        });
    });
});
