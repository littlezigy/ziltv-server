const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const video = require('../../src/video');
const videoDal = require('../../src/dal/video.dal');
const { users } = require('../testData');

const proxyquire = require('proxyquire');
const sinon = require('sinon');
const path = '../../src/video';
const authPath = './session';
function writeStubs() {
    return {
        [authPath]: {
            startSession: () => true,
            getSession: () => 1
        }
    }
}

describe('Video module', function() {
    it('video.fetch should return video details', function() {
        return video.fetch(2)
        .then(res => {
            expect(res).to.include.keys('id', 'creator', 'name', 'description', 'url', 'thumbnail');
        });
    });

    it('video.fetch should return creator details', function() {
        return video.fetch(2)
        .then(res => {
            expect(res).to.have.property('creator').that.is.an('object');
            expect(res.creator).to.have.property('id').that.is.a('number');
        });
    });
    
    it('video.fetch should return badge config', function() {
        return video.fetch(2)
        .then(res => {
            expect(res).to.have.property('badgeConfig').that.is.an('array');
            expect(res.badgeConfig).to.not.be.empty;
        });
    });

    it('video.fetchByCreator(id) should return all videos createdby creator with id "id"', function() {
        const creator = users[0];
        const userID = creator.id;
        const stubs = writeStubs();
        stubs[authPath].get = sinon.fake.returns(userID);
        const videoModule = proxyquire(path, stubs);

        return Promise.all([
            video.fetchByCreator(userID),
            videoModule.fetchByCreator()
        ])
        .then(responses => {
            responses.forEach(resArr => {
                expect(resArr).to.have.lengthOf.at.least(4);

                expect(resArr).to.satisfy(arr => {
                    return arr.every(res => {
                        expect(res).to.include.keys('id', 'creator', 'name', 'thumbnail', 'url');
                        expect(res).to.have.property('creator').that.is.an('object');
                        expect(res.creator).to.have.property('id', userID);
                        return true;
                    });
                });
            });
        });
    });

    it('video.fetchAll should return creator details', function() {
        return video.fetchAll()
            .then(resArr => {
                expect(resArr).to.satisfy(arr => {
                    return arr.every(res => {
                        expect(res).to.include.keys('id', 'creator', 'name', 'thumbnail');
                        expect(res).to.have.property('creator').that.is.an('object');
                        expect(res.creator).to.have.property('id').that.is.a('number');
                        expect(res.creator).to.have.property('name').that.is.a('string');
                        expect(res.creator).to.have.property('username').that.is.a('string');
                        expect(res.creator).to.have.property('avatar').that.is.a('number');
                        return true;
                    });
                });
            });
    });
});

