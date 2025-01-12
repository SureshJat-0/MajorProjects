const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const { ExpressError } = require('./errorHandler')

const port = 3000;
const app = express();

const { ListingRouter } = require('./controllers/listing');

// Connection of mongoDb
const { connectMongo } = require('./mongoConnections');
connectMongo('mongodb://127.0.0.1:27017/airbnb')
    .then(() => { console.log("MongoDb Connected") })
    .catch((err) => { console.log("Mongo error") });


// All middleswares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// All requests on home page
app.get('/', (req, res) => {
    res.send('Home Page');
})

// All requests on listing page
app.use('/listing', ListingRouter);


// Costom Error handler
app.use((err, req, res, next) => {
    console.log('----- Error ------');
    console.log(err.name);
    const { status = 500, message = "Some error Occured!"} = err;
    res.status(status).send(message);
    // next(err); // This will call the next error handler ( default express error handler )
    // next() // if no err argument pass it will search for the middleware which is not error handler
})

// Middleware if no route is found
app.use((req, res, next) => {
    res.status(404).send('Page Not Found');
})

app.listen(port, () => {
    console.log('Server Started');
})

