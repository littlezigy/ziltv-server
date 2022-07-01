const seedDB = require('../testData/seedDatabase');
const chai = require('chai');
const chaiPromised = require('chai-as-promised');

exports.mochaHooks = {
    beforeAll() {
        chai.use(chaiPromised);
        return seedDB()
            // .then(res => console.log('Finished seeding DB', res));
    }
}
