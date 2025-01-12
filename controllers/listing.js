const express = require('express');
const ListingRouter = express.Router();

const { listingPagehandler, indivisualListPageHandler, editListPageHandler, postEditedPageHandler, deleteListHandler, getNewListPostHandler, postNewPlaceHandler } = require('../routes/listingHandler');

ListingRouter.get('/', listingPagehandler);
ListingRouter.get('/new', getNewListPostHandler);
ListingRouter.post('/new', postNewPlaceHandler);
ListingRouter.get('/:id', indivisualListPageHandler);
ListingRouter.get('/:id/edit/', editListPageHandler);
ListingRouter.post('/:id/edit/', postEditedPageHandler);
ListingRouter.get('/delete/:id', deleteListHandler);

module.exports = {
    ListingRouter,
}