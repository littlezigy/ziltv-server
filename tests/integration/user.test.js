const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const { users } = require('../testData');
const { ClientError, UnauthorizedError } = require('../../src/errors');
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

describe('User module', function() {
    it('Login', function() {
        const { username, password, zil_bech32: bech32Address, name, email, avatar }  = users[4];
        const data = {username, password };
        const reqObj = 4;
        const spy = sinon.fake.returns(true);

        const stubs = writeStubs();
        stubs[authPath].startSession = spy;
        const userModule = proxyquire(path, stubs);

        return userModule.login(data, reqObj)
            .then(res => {
                sinon.assert.calledWith(spy, sinon.match.has('username', username), reqObj);
                // expect(res).to.have.property('id').that.is.a('number');
                expect(res).to.contain({
                    username, bech32Address, name, email, avatar
                });
            });
    });
    it('Login for user account that does not exist', function() {
        const data = {username: faker.internet.userName(),
            password: faker.internet.password()
        };
        const reqObj = 4;
        const spy = sinon.fake.returns(true);

        const stubs = writeStubs();
        stubs[authPath].startSession = spy;
        const userModule = proxyquire(path, stubs);

        return expect(userModule.login(data, reqObj)).to.be.rejectedWith(ClientError, 'Account doesn\'t exist');
    });

    it('Login with bad password', function() {
        const { username }  = users[4];

        const data = { username, password: faker.internet.password() };
        const reqObj = 4;
        const spy = sinon.fake.returns(true);

        const stubs = writeStubs();
        stubs[authPath].startSession = spy;
        const userModule = proxyquire(path, stubs);

        return expect(userModule.login(data, reqObj)).to.be.rejectedWith(ClientError, 'Wrong username or password');
    });
    it('Signup', function() {
        const data = {username: faker.internet.userName(),
            password: faker.internet.password()
        };
        const reqObj = 4;

        const spy = sinon.fake.returns(true);

        const stubs = writeStubs();
        stubs[authPath].startSession = spy;
        const userModule = proxyquire(path, stubs);

        return userModule.signup(data, reqObj)
            .then(res => {
                sinon.assert.calledWith(spy, sinon.match.has('username', data.username), reqObj);
                expect(res).to.have.property('id').that.is.a('number');
            });
    });
});
