const express = require('express');
const ListingRouter = express.Router();

const { listingPagehandler } = require('../routes/listingHandler');

ListingRouter.get('/', listingPagehandler);

module.exports = {
    ListingRouter,
}