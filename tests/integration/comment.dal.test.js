const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const { users } = require('../testData');

const dal = require('../../src/dal/comment.dal');

describe("DAL for comments", function() {
    it('Post comment', function() {
        const videoID = 3;
        const poster = 5;
        const text = faker.lorem.paragraph();

        return dal.post(videoID, poster, text)
        .then(res => {
            expect(res).to.have.property('id').that.is.a('number');
            return dal.fetchByID(res.id)
        })
        .then(res => {
            expect(res).to.have.property('userID', poster);
            expect(res).to.have.property('text', text);
            expect(res).to.have.property('videoID', videoID);
        });
    });
});
