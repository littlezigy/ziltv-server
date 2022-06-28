const router = require('express').Router();
const errorHandler = require('./errorHandler');
const badge = require('./badge');
const comment = require('./comment');
const video = require('./video');
const user = require('./user');

/*
require('./user/routes')(router);
require('./nft/routes')(router);
*/

router.use((err, req, res, next) => {
    return errorHandler(err, req, res, next);
});

router.post('/badge', function(req, res) {
    return badge.assignBadge(req.body)
        .then(payload => res.send(payload));
});

router.get('/creator/badges/:id', function(req, res) {
    return badge.fetchCreatorBadges(req.params.id)
        .then(payload => res.send(payload));
});

router.post('/comment', function(req, res) {
    return comment.post(req.body)
        .then(payload => res.send(payload));
});

router.get('/comment/:id', function(req, res) {
    console.log("Fetching:", req.params.id);
    return comment.fetch(req.params.id)
        .then(payload => res.send(payload));
});

router.get('/videos', function(req, res) {
    return video.fetchAll()
        .then(payload => res.send(payload));
});

router.post('/video', function(req, res) {
    return video.post(req.body, req)
        .then(payload => res.send(payload));
});

router.put('/video/:id', function(req, res) {
    return video.edit(req.params.id, req.body, req)
        .then(payload => res.send(payload));
});

router.get('/video/:id', function(req, res) {
    return video.fetch(req.params.id)
        .then(payload => res.send(payload));
});

router.get('/profile', function(req, res) {
    return user.viewProfile(req)
    .then(payload => res.send(payload));
});

router.get('/profile/:id', function(req, res) {
    return user.viewProfile(req.params.id)
    .then(payload => res.send(payload));
});

router.put('/profile', function(req, res) {
    return user.editProfile(req.body, req)
        .then(payload => res.send(payload));
});

router.post('/login', function(req, res) {
    return user.login(req.body, req)
        .then(payload => res.send(payload));
});

router.post('/signup', function(req, res) {
    return user.signup(req.body, req)
        .then(payload => res.send(payload));
});

module.exports = router;
