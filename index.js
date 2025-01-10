const express = require('express');
const path = require('path');

const port = 3000;

const { ListingRouter } = require('./controllers/listing');

const app = express();

const { connectMongo } = require('./mongoConnections');

connectMongo('mongodb://127.0.0.1:27017/airbnb')
    .then(() => { console.log("MongoDb Connected") })
    .catch((err) => { console.log("Mongo error") });


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.send('OK')
})

app.use('/listing', ListingRouter);



app.listen(port, () => {
    console.log('Server Started');
})

