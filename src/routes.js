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

router.post('/badge', function(req, res, next) {
    return badge.assignBadge(req.body, req)
        .then(payload => res.send(payload))
        .catch(e => next(e));
});

router.get('/badges', function(req, res, next) {
    return badge.fetchCreatorBadges(req)
        .then(payload => res.send(payload))
    .catch(e => next(e));
});

router.get('/creator/:id/badges', function(req, res, next) {
    return badge.fetchCreatorBadges(req.params.id)
        .then(payload => res.send(payload))
        .catch(e => next(e));
});

router.post('/comment', function(req, res, next) {
    return comment.post(req.body, req)
        .then(payload => res.send(payload))
        .catch(e => next(e));
});

router.get('/comment/:id', function(req, res, next) {
    return comment.fetch(req.params.id)
        .then(payload => res.send(payload))
        .catch(e => next(e));
});

router.get('/video/:id/comments', function(req, res, next) {
    return comment.fetchByVideo(req.params.id)
        .then(payload => res.send(payload))
        .catch(e => next(e));
});

router.get('/videos', function(req, res) {
    return video.fetchAll()
        .then(payload => res.send(payload));
});

router.get('/creator/:id/videos', function(req, res, next) {
    return video.fetchByCreator(req.params.id)
        .then(payload => res.send(payload))
        .catch(e => next(e));
});

router.get('/my-videos', function(req, res, next) {
    return video.fetchByCreator(req)
        .then(payload => res.send(payload))
        .catch(e => next(e));
});

router.post('/video', function(req, res, next) {
    return video.post(req.body, req)
        .then(payload => res.send(payload))
        .catch(e => next(e));
});

router.put('/video/:id', function(req, res) {
    return video.edit(req.params.id, req.body, req)
        .then(payload => res.send(payload));
});

router.get('/video/:id', function(req, res) {
    return video.fetch(req.params.id)
        .then(payload => res.send(payload));
});

router.get('/profile', function(req, res, next) {
    return user.viewProfile(req)
    .then(payload => res.send(payload))
    .catch(e => next(e));
});

router.get('/profile/:id', function(req, res) {
    return user.viewProfile(req.params.id)
    .then(payload => res.send(payload));
});

router.put('/profile', function(req, res, next) {
    return user.editProfile(req.body, req)
        .then(payload => res.send(payload))
        .catch(e => next(e));
});

router.post('/login', function(req, res, next) {
    return user.login(req.body, req)
        .then(payload => res.send(payload))
        .catch(e => next(e));
});

router.post('/signup', function(req, res, next) {
    return user.signup(req.body, req)
        .then(payload => res.send(payload))
        .catch(e => next(e));
});

router.use((err, req, res, next) => {
    return errorHandler(err, req, res, next);
});

module.exports = router;
