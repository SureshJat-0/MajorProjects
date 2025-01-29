const { List } = require('../models/list');
const { Review } = require('../models/review');

async function isOwner(req, res, next) {
    const id = req.params.id;
    let listItem = await List.findById(id);
    if(!listItem.owner._id.equals(res.locals.currUser._id)) {
        req.flash('error', 'You are not the owner!');
        return res.redirect(`/listing/${id}`);
    }
    next();
}

async function isReviewAuthor(req, res, next) {
    const { id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash('error', 'You are not the owner of this review!');
        return res.redirect(`/listing/${id}`);
    }
    next();
}

module.exports = {
    isOwner,
    isReviewAuthor,
}