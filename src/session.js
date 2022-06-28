module.exports = {
    startSession(user, req) {
        req.session.user_id = user.id;

        return true;
    },
    get(req) {
        if(req && req.session)
            return req.session.user_id || false;
        else return false;
    }
}
