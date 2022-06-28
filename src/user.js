const dal = require('./dal/user.dal');
const sessionManager = require('./session');

module.exports = {
    login(data, reqObj) {
        return dal.fetchByUsername(data.username)
            .then(res => {
                const password = data.password;
                if(password == res.password) {
                    const { id, name, username, email, avatar } = res;

                    sessionManager.startSession({id, username}, reqObj)

                    return {
                        id, name, email, username, avatar
                    }
                }
                else return {fail: 'error authenticating'};
            });
    },
    signup(data, reqObj) {
        return dal.create(data)
            .then(res => {
                if(res) {
                    const { id, username, avatar } = res;
                    sessionManager.startSession({id, username}, reqObj)

                    return {
                        id, username
                    }
                } else return false;
            });
    },
    viewProfile(reqObjOrID) {
        let id;
        if(typeof reqObjOrID == 'number' || typeof reqObjOrID == 'string')
            id = reqObjOrID
        else
            id = sessionManager.get(reqObjOrID)

        if(id) {
            return dal.fetchByID(id)
                .then(res => {
                    if(res) return res;
                    else return { error: "user not found"}
                });
        }

        else return { error: "user not found"}
    },

    editProfile(data, reqObj){
    },

    fetch(id) {
        return dal.fetchByID(id)
    }
}
