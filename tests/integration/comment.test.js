const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const sinon = require('sinon');

const proxyquire = require('proxyquire');
const path = '../../src/user';
const authPath = './session';
function writeStubs() {
    return {
        [authPath]: {
            startSession: () => true,
            get: () => faker.datatype.number()
        }
    }
}

const comment = require('../../src/comment');
const testData = require('../testData');

describe('Comment module', function() {
    it("Post and retrieve comment", function() {
        const poster=4;
        const data = {
            videoID: 3, text: faker.lorem.paragraph()
        }

        const stubs = writeStubs();
        stubs[authPath].get = sinon.fake.returns(poster);

        const commentMock = proxyquire('../../src/comment', stubs);

        return commentMock.post(data)
            .then(res => {
                expect(res).to.have.property('id').that.is.a('number');
                return  comment.fetch(res.id)
            })
            .then(res => {
                expect(res).to.have.property('text', data.text);
                expect(res).to.have.property('poster', poster);
                expect(res).to.have.property('videoID', data.videoID);
            });
    });

    it('Fetch comments for a video', function() {
        return comment.fetchByVideo(2)
        .then(res => {
            expect(res).to.have.lengthOf.at.least(4);
        });
    });

    it('Comments for video should have right properties', function() {
        return comment.fetchByVideo(2)
        .then(res => {
            expect(res).to.all.satisfy(arr => {
                return arr.every(c => {
                    expect(c).to.include.keys('text', 'poster', 'video');
                    expect(c.video).to.include.keys('id');
                    expect(c.video).to.have.property('id').that.is.a('number');
                    expect(c.poster).to.have.property('id').that.is.a('number');
                    expect(c.poster).to.have.property('name').that.is.a('string');
                    expect(c.poster).to.have.property('bech32').that.matches(/^zil[\w\d]+$/);
                    expect(c.text).to.not.be.null;

                    return true;
                });
            });
        });
    });
});
