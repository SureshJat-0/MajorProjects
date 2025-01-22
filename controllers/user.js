const express = require('express');
const UserRouter = express.Router();
const passport = require('passport');
const { asyncWrapErroHandler } = require('../errors/errorHandler');

const { getSignupPageHandler, postSignupHandler, getLoginPageHadler, postLoginHandler } = require('../routes/userHandler');

UserRouter.get('/', (req, res) => {
    res.send('home');
})

UserRouter.get('/signup', getSignupPageHandler);
UserRouter.post('/signup', asyncWrapErroHandler(postSignupHandler));
UserRouter.get('/login', getLoginPageHadler);
UserRouter.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), asyncWrapErroHandler(postLoginHandler));

module.exports = UserRouter;