const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const flash = require('connect-flash');
const { flashLocals } = require('./middlewares/flash');
const { sessionMiddleware } = require('./middlewares/session');
const passport = require('passport');
const LocalStretagy = require('passport-local');
const User = require('./models/user');

const port = process.env.PORT || 3000;
const app = express();

const { ListingRouter } = require('./controllers/listing');
const UserRouter = require('./controllers/user');

// Connection of mongoDb
const { connectMongo } = require('./mongoConnections');
connectMongo('mongodb://127.0.0.1:27017/airbnb')
    .then(() => { console.log("MongoDb Connected") })
    .catch((err) => { console.log("Mongo error") });


// All middleswares
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
//sessions
app.use(sessionMiddleware);
app.use(flash());
app.use(flashLocals);
//authantication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStretagy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// All requests on home page
app.use('/', UserRouter);

// All requests on listing page
app.use('/listing', ListingRouter);


// Costom Error handler
app.use((err, req, res, next) => {
    console.log('----- Error ------');
    console.log(err.name);
    const { status = 500, message = "Some error Occured!" } = err;
    res.status(status).render('listings/error.ejs', { message });
    // next(err); // This will call the next error handler ( default express error handler )
    // next() // if no err argument pass it will search for the non-error handling meddleware
})

// Middleware if no route is found
app.use((req, res, next) => {
    res.status(404).render('listings/error.ejs', { message: "Page Not Found!" });
})

app.listen(port, () => {
    console.log('Server Started');
})

