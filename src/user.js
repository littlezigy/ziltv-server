const dal = require('./dal/user.dal');
const sessionManager = require('./session');

module.exports = {
    login(data, reqObj) {
        return dal.fetchByUsername(data.username)
        .then(res => {
            const password = data.password;
            console.log("checking passwords match:", password, res.password);
            if(password == res.password) {
            console.log("passwords match");
                const { id, name, username, email, avatar } = res;

                console.log("will auth");
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
    fetch(id) {
        return dal.fetchByID(id)
    }
}
