const express = require('express');
const ListingRouter = express.Router();

const { listingPagehandler, indivisualListPageHandler, editListPageHandler } = require('../routes/listingHandler');

ListingRouter.get('/', listingPagehandler);
ListingRouter.get('/:id', indivisualListPageHandler);
ListingRouter.get('/:id/edit/', editListPageHandler);

module.exports = {
    ListingRouter,
}