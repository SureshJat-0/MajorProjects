const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    rating: {
        type: String,
        min: 1,
        max: 5,
        require: true,
    },
    comment: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

const Review = mongoose.model('review', reviewSchema);

module.exports = Review;