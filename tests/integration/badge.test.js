const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const badge = require('../../src/badge');
const badgeDal = require('../../src/dal/badge.dal');
const db = require('../../config/database')();
const { users } = require('../testData');

const { fakeReq } = require('../utils');

const proxyquire = require('proxyquire');
const sinon = require('sinon');

const path = '../../src/user';
const authPath = './session';
function writeStubs() {
    return {
        [authPath]: {
            startSession: () => true
        }
    }
}

describe('Badge module', function() {
    it('Creator set and retrieve badge', function() {
        const creatorID = users[6].id;
        const data = {
            badgeImg: faker.internet.url(),
            specifyTokens: 'false',
            nftAddress: faker.finance.ethereumAddress(),
        }

        const stubs = writeStubs();
        stubs[authPath].get = sinon.fake.returns(creatorID);

        const badgeModule = proxyquire('../../src/badge', stubs);
        return badgeModule.assignBadge(data, fakeReq())
            .then(res => {
                expect(res).to.have.property('id').that.is.a('number');

                return badgeDal.fetchByID(res.id);
            })
            .then(res => {
                expect(res.creator).to.equal(creatorID);
                expect(res).to.include(data);
            });
    });

    it('Creator set badge with more details', function() {
        const creatorID = users[2].id;

        const data = {
            badgeImg: faker.internet.url(),
            tokenIDs: [3, 4, 2],
            specifyTokens: 'oneOf',
            nftAddress: faker.finance.ethereumAddress(),
        }

        const stubs = writeStubs();
        stubs[authPath].get = sinon.fake.returns(creatorID);

        const badgeModule = proxyquire('../../src/badge', stubs);
        return badgeModule.assignBadge(data, fakeReq())
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
