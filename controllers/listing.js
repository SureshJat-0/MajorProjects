const express = require('express');
const ListingRouter = express.Router();

const { listingPagehandler, indivisualListPageHandler } = require('../routes/listingHandler');

ListingRouter.get('/', listingPagehandler);
ListingRouter.get('/:id', indivisualListPageHandler);

module.exports = {
    ListingRouter,
}