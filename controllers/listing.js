const express = require('express');
const ListingRouter = express.Router();
// Error handler for asnc functions
const { asyncWrapErroHandler } = require('../errors/errorHandler');
const validateListingJoi = require('../errors/joi');

const { listingPagehandler, indivisualListPageHandler, editListPageHandler, postEditedPageHandler, deleteListHandler, getNewListPostHandler, postNewPlaceHandler } = require('../routes/listingHandler');

// all listings
ListingRouter.get('/', asyncWrapErroHandler(listingPagehandler));
// add new place 
ListingRouter.get('/new', asyncWrapErroHandler(getNewListPostHandler));
ListingRouter.post('/new', validateListingJoi, asyncWrapErroHandler(postNewPlaceHandler));
// get indivisual place page
ListingRouter.get('/:id', asyncWrapErroHandler(indivisualListPageHandler));
// edit place
ListingRouter.get('/:id/edit/', asyncWrapErroHandler(editListPageHandler));
ListingRouter.post('/:id/edit/', validateListingJoi, asyncWrapErroHandler(postEditedPageHandler));
// delete place
ListingRouter.delete('/:id', asyncWrapErroHandler(deleteListHandler));

module.exports = {
    ListingRouter,
}