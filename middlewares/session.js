const session = require('express-session');

const sessionMiddleware =  session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
})

module.exports = {
    sessionMiddleware,
}
