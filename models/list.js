const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    imgUrl: {
        type: String,
        require: true
    },
    hotelLocation: {
        type: String,
        require: true,
    },
    hotelPrice: {
        type: Number,
        require: true
    },
    hotelDescription: {
        type: String,
        require: true,
    }
});

const List = mongoose.model('list', ListSchema);

module.exports = {
    List,
}