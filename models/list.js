const mongoose = require('mongoose');
const { Review } = require('./review');

const ListSchema = new mongoose.Schema({
    hotelTitle: {
        type: String,
        require: true,
    },
    hotelDescription: {
        type: String,
        require: true,
    },
    image: {
        url: String,
        filename: String,
    },
    hotelPrice: {
        type: Number,
        require: true
    },
    hotelCountry: {
        type: String,
        require: true,
    },
    hotelLocation: {
        type: String,
        require: true,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    geometry: {
        coordinates: {
            lat: {
                type: Number,
                require,
            },
            lng: {
                type: Number,
                require,
            }
        }
    },
    category: {
        type: String,
        enum: ['Trending', 'Islands', 'Farms', 'Beachfront', 'Rooms', 'OMG!', 'Castles', 'Camping', 'Lake', 'Design', 'Caves', 'New', 'Mansions', 'Play', 'Desert'],
        require: true,
    }
});

// for the search query
ListSchema.index({ 
    hotelTitle: "text", 
    hotelDescription: "text", 
    hotelPrice: "text", 
    hotelCountry: "text", 
    hotelLocation: "text", 
    category: "text" 
});

ListSchema.post('findOneAndDelete', async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
})

const List = mongoose.model('List', ListSchema);

module.exports = {
    List,
}