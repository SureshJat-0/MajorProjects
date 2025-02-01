const express = require('express');
const UserRouter = express.Router();
const passport = require('passport');
const { asyncWrapErroHandler } = require('../errors/errorHandler');

const { getSignupPageHandler, postSignupHandler, getLoginPageHadler, postLoginHandler, logoutUserHandler } = require('../routes/userHandler');
const { saveRedirectUrl } = require('../middlewares/isLoggedIn');

UserRouter.route('/signup')
    .get(getSignupPageHandler)
    .post(asyncWrapErroHandler(postSignupHandler))
UserRouter.route('/login')
    .get(getLoginPageHadler)
    .post(saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), asyncWrapErroHandler(postLoginHandler))
UserRouter.get('/logout', logoutUserHandler);

module.exports = UserRouter;