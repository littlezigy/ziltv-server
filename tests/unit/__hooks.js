const chai = require('chai');
const chaiPromised = require('chai-as-promised');

exports.mochaHooks = {
    beforeAll() {
        chai.use(chaiPromised);
    }
}
