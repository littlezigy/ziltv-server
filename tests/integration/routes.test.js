const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const { users, videos } = require('../testData');
const app = require('../../app.js');
const request = require('supertest');

describe('Routes', function() {
    const videoID = videos[2].id;
    it('Creator set badge at /badge', function() {
        const creator = users[2].id;

        const data = {
            creator: users[2].id,
            badgeImg: faker.internet.url(),
            specifyTokens: 'false',
            nftAddress: faker.finance.ethereumAddress(),
        }

        return request(app).post('/badge').send(data)
            .then(res => {
                expect(res.body).to.have.property('id').that.is.a('number');

                return request(app).get('/creator/badges/' + 1)
            })
            .then(res => {
                expect(res.body).to.have.lengthOf.at.least(4);
                return request(app).get('/creator/badges/' + creator)
            })
            .then(res => {
                expect(res.body).to.include.deep.members([data]);
            });
    });

    it('Post comment', function() {
        const data = {
            videoID: 4, user: 3, text: faker.lorem.paragraph()}

        return request(app).post('/comment').send(data)
            .then(res => {
                expect(res.body).to.have.property('id').that.is.a('number');

                return request(app).get('/comment/' + res.body.id)
            })
            .then(res => {
                expect(res.body).to.contain(data);
            });
    });

    it('Signup and login', function() {
        const data = {username: faker.internet.userName(), password: faker.internet.password()}

        return request(app).post('/signup').send(data)
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res.headers).to.have.property('set-cookie');
                expect(res.headers['set-cookie'][0]).to.have.string('ziltv.cookie');
                expect(res.headers['set-cookie'][0]).to.match(/^ziltv\.cookie/);

                return request(app).post('/login').send(data)
            })
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res.headers).to.have.property('set-cookie');
                expect(res.headers['set-cookie'][0]).to.have.string('ziltv.cookie');
                expect(res.headers['set-cookie'][0]).to.match(/^ziltv\.cookie/);
            });
    });
});

