const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const video = require('../../src/video');
const videoDal = require('../../src/dal/video.dal');
const { users } = require('../testData');

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

    it('video.fetchAll should return creator details', function() {
        return video.fetchAll()
        .then(resArr => {
            expect(resArr).to.satisfy(arr => {
                return arr.every(res => {
                    expect(res).to.include.keys('id', 'creator', 'name', 'thumbnail');
                    expect(res).to.have.property('creator').that.is.an('object');
                    expect(res.creator).to.have.property('id').that.is.a('number');
                    expect(res.creator).to.have.property('name').that.is.a('string');
                    return true;
                });
            });
        });
    });
});

