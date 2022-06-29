const seedDB = require('../testData/seedDatabase');

exports.mochaHooks = {
    beforeAll() {
        console.log("seeidng");
        return seedDB()
    }
}
