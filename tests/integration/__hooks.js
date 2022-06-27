const seedDB = require('../testData/seedDatabase');

exports.mochaHooks = {
    beforeAll() {
        return seedDB()
            // .then(res => console.log('Finished seeding DB', res));
    }
}
