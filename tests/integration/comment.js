const { expect } = require('chai');
const { faker } = require('@faker-js/faker');

const comment = require('../../src/comment');

describe('Comment module', function() {
    it("Post and retrieve comment", function() {
        const data = {
            videoID: 3, poster: 4, text: faker.lorem.paragraph()
        }

        return comment.post(data)
            .then(res => {
                expect(res).to.have.property('id').that.is.a('number');
                return  comment.fetch(res.id)
            })
            .then(res => {
                console.log("res:", res);
                expect(res).to.have.property('text', data.text);
                expect(res).to.have.property('poster', data.poster);
                expect(res).to.have.property('videoID', data.videoID);
            });
    });
});
