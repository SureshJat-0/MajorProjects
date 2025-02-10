const session = require('express-session');
const MongoStore = require('connect-mongo');

const store = MongoStore.create({
    mongoUrl: process.env.ATLAS_URL,
    crypto: {
        secret: process.env.SUPER_SECRET,
    },
    touchAfter: 24 * 3600,
})

const sessionOptions = {
    store,
    secret: process.env.SUPER_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}


const sessionMiddleware =  session(sessionOptions);

module.exports = {
    sessionMiddleware,
}
