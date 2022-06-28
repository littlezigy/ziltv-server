module.exports = {
    startSession(user, req) {
        console.log("athenticationg");
        req.session.user_id = user.id;

        return true;
    }
}
