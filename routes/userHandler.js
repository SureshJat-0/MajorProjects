const User = require('../models/user');

function getSignupPageHandler(req, res) {
    res.render('user/signup.ejs');
}

async function postSignupHandler(req, res) {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registerdUser = await User.register(newUser, password);
        req.login(registerdUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'User Registered!');
            res.redirect('/listing');
        })

    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/signup');
    }
}

function getLoginPageHadler(req, res) {
    res.render('user/login.ejs');
}

async function postLoginHandler(req, res) {
    req.flash('success', 'Welcome to PlacePort!');
    if (res.locals.redirectUrl) {
        return res.redirect(res.locals.redirectUrl);
    }
    res.redirect('/listing');
}

function logoutUserHandler(req, res, next) {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'You are Logged out!');
        res.redirect('/listing');
    })
}

module.exports = {
    getSignupPageHandler,
    postSignupHandler,
    getLoginPageHadler,
    postLoginHandler,
    logoutUserHandler,
}