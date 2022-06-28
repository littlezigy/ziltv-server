const dal = require('./dal/video.dal');
const session = require('./session');

module.exports = {
    post(data, sessionObj) {
        const creator = session.get(sessionObj);
        if(creator) 
            return dal.create({...data, creator});
    },

    edit(id, data, sessionObj) {
        const creator = session.get(sessionObj);
        if(creator)
            return dal.edit(id, data);
    },

    fetch(id) {
        return dal.fetchByID(id);
    },

    fetchAll() {
        return dal.fetchAll()
    }
}
