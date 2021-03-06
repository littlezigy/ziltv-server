const dal = require('./dal/user.dal');
const sessionManager = require('./session');
const { UnauthorizedError, ClientError } = require('./errors');

module.exports = {
    login(data, reqObj) {
        return dal.fetchByUsername(data.username)
            .then(res => {
                if(res) {
                    const password = data.password;
                    if(password == res.password) {
                        const { id, name, username, email, avatar, bech32 } = res;

                        sessionManager.startSession({id, username}, reqObj)

                        return {
                            id, name, email, username, avatar, bech32Address: bech32
                        }
                    }
                    else return Promise.reject(new ClientError('Wrong username or password'));
                } else
                    return Promise.reject(new ClientError('Account doesn\'t exist'));
            });
    },
    signup(data, reqObj) {
        if(!data.username || !data.password)
            return Promise.reject(new ClientError('Bad signup request'))

        const defaultAvatar = 'https://bafybeifgj5aut4m4tfz3prvkhj2jc6wan2qoeaixp36zjgrguqqioxdcdi.ipfs.infura-ipfs.io/';

        return dal.create({...data, avatar: defaultAvatar})
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
        else {
            id = sessionManager.get(reqObjOrID)

            if(!id) throw new UnauthorizedError('Not authenticated');
        }

        if(id) {
            return dal.fetchByID(id)
                .then(res => {
                    if(res) return res;
                    else throw new ClientError("user not found")
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
