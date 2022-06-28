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

    it('View another user\'s profile', function() {
        const data = users[8];
        const profile = { ...data }

        delete profile.password;

        return request(app).get('/profile/' + data.id)
            .then(res => {
                expect(res.body).to.deep.contain(profile);
            });
    });

    it('View, and edit own user profile', function() {
        const data = users[5];
        const profile = { ...data }

        delete profile.password;
        delete profile.bech32Address;
        delete profile.zil_bech32;

        const newProfile = {
            name: faker.name.findName(),
            username: faker.internet.userName(),
            email: faker.internet.email()
        }

        let cookie;

        return request(app).post('/login').send(data)
            .then(res => {
                cookie = res.headers['set-cookie'][0];

                // View own profile
                return request(app).get('/profile').set('Cookie', cookie)
            })
            .then(res => {
                // expect(res.body).to.deep.contain(profile);

                // Edit profile
                return request(app).put('/profile').send(newProfile).set('Cookie', cookie)
            })
            .then(res => request(app).get('/profile').set('Cookie', cookie))
            .then(res => {
                expect(res.body).to.contain(newProfile);
            });
    });

    it('View all videos', function() {
        return request(app).get('/videos')
            .then(res => {
                expect(res.body).to.not.be.empty;
            })
    });

    it('Post, view and edit video', function() {
        const creator = users[1];
        let cookie;

        const data = {
            url: faker.internet.url(),
            name: faker.commerce.productName(),
            description: faker.lorem.sentence()
        };

        const newData = {
            url: faker.internet.url(),
            name: faker.commerce.productName(),
            description: faker.lorem.sentence()
        };

        return request(app).post('/login').send({ username: creator.username, password: creator.password })
            .then(res => {
                cookie = res.headers['set-cookie'][0];

                return request(app).post('/video').send(data).set('Cookie', cookie)
            })
            .then(res => {
                expect(res.body).to.have.property('id').that.is.a('number');
                return request(app).get('/video/' + res.body.id)
            })
            .then(res => {
                expect(res.body).to.have.property('id').that.is.a('number');
                expect(res.body).to.contain(data);

                return request(app).put('/video/'  + res.body.id).send(newData).set('Cookie', cookie);
            })
            .then(res => {
                expect(res.body).to.have.property('id').that.is.a('number');
                return request(app).get('/video/' + res.body.id)
            })
            .then(res => {
                expect(res.body).to.contain(newData);
                return request(app).get('/videos')
            })
            .then(res => {
                expect(res.body).to.not.be.empty;
                expect(res.body).to.include.deep.members([newData]);
            });
    });
});

