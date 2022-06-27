const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const badge = require('../../src/badge');
const badgeDal = require('../../src/dal/badge.dal');
const db = require('../../config/database')();
const { users } = require('../testData');

describe('Badge module', function() {
    it('Creator set and retrieve badge', function() {
        const data = {
            badgeImg: faker.internet.url(),
            creator: users[2].id,
            specifyTokens: 'false',
            nftAddress: faker.finance.ethereumAddress(),
        }

        return badge.assignBadge(data)
            .then(res => {
                expect(res).to.have.property('id').that.is.a('number');

                return badgeDal.fetchByID(res.id);
            })
            .then(res => {
                expect(res).to.include(data);
            });
    });

    it('Creator set badge with more details', function() {
        const data = {
            badgeImg: faker.internet.url(),
            creator: users[2].id,
            tokenIDs: [3, 4, 2],
            specifyTokens: 'oneOf',
            nftAddress: faker.finance.ethereumAddress(),
        }

        return badge.assignBadge(data)
            .then(res => {
                expect(res).to.have.property('id').that.is.a('number');

                return badgeDal.fetchByID(res.id);
            })
            .then(res => {
                expect(res).to.deep.include(data);
            });
    });

    it('Fetch creator badges', function() {
        const creator = 1;
        return badge.fetchCreatorBadges(creator)
        .then(res => {
            expect(res).to.have.lengthOf.at.least(4);
        });
    });
});
