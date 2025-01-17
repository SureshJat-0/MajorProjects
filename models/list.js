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
    imgUrl: {
        type: String,
        default: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
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
    ]
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