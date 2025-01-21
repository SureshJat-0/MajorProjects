const { List } = require('../models/list');
const { Review } = require('../models/review');

async function postReviewHandler(req, res) {
    let listing = await List.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash('success', 'New Review Created!');
    res.redirect(`/listing/${req.params.id}`);
}

async function deleteReviewHandler(req, res) {
    const { id, reviewId } = req.params;
    await List.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review Deleted!');
    res.redirect(`/listing/${id}`);
}

module.exports = {
    postReviewHandler,
    deleteReviewHandler,
}