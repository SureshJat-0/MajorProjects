const express = require('express');
const ListingRouter = express.Router();
// Error handler for asnc functions
const { asyncWrapErroHandler } = require('../errors/errorHandler');
const { validateListingJoi, validateReviewJoi } = require('../errors/joi');
// middleware
const { isLoggedIn } = require('../middlewares/isLoggedIn');

const { listingPagehandler, indivisualListPageHandler, editListPageHandler, postEditedPageHandler, deleteListHandler, getNewListPostHandler, postNewPlaceHandler } = require('../routes/listingHandler');
const { postReviewHandler, deleteReviewHandler } = require('../routes/reviewHandler');
const { isOwner, isReviewAuthor } = require('../middlewares/isOwner');

// all listings
ListingRouter.get('/', asyncWrapErroHandler(listingPagehandler));
// add new place 
ListingRouter.route('/new')
    .get(isLoggedIn, asyncWrapErroHandler(getNewListPostHandler))
    .post(isLoggedIn, validateListingJoi, asyncWrapErroHandler(postNewPlaceHandler))
// get indivisual place page
ListingRouter.route('/:id')
    .get(asyncWrapErroHandler(indivisualListPageHandler))
    .delete(isLoggedIn, isOwner, asyncWrapErroHandler(deleteListHandler))
// edit place
ListingRouter.route('/:id/edit/')
    .get(isLoggedIn, asyncWrapErroHandler(editListPageHandler))
    .post(isLoggedIn, isOwner, validateListingJoi, asyncWrapErroHandler(postEditedPageHandler))
// Post req for the review page
ListingRouter.post('/:id/reviews', isLoggedIn, validateReviewJoi, asyncWrapErroHandler(postReviewHandler));
ListingRouter.delete('/:id/reviews/:reviewId/', isLoggedIn, isReviewAuthor, asyncWrapErroHandler(deleteReviewHandler));

module.exports = {
    ListingRouter,
}