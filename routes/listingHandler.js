const { ExpressError } = require('../errors/errorHandler');
const { List } = require('../models/list');

// Listing all Places
async function listingPagehandler(req, res) {
    const allLists = await List.find();
    res.render('listings/allListingPage.ejs', { allLists: allLists });
}

// Indivisual page
async function indivisualListPageHandler(req, res, next) {
    const id = req.params.id;
    const listItem = await List.findById(id);
    // Error if id is not found in db
    if (!listItem) {
        return next(new ExpressError(404, 'No Place Found!'));
    }
    res.render('listings/individualList.ejs', { listItem: listItem });
}

// Post the edited Place to db
async function postEditedPageHandler(req, res, next) {
    const body = req.body;
    const id = req.params.id;
    await List.findByIdAndUpdate(id, {
        imgUrl: body.imgUrl,
        hotelLocation: body.hotelLocation,
        hotelPrice: body.hotelPrice,
        hotelDescription: body.hotelDescription
    });
    res.redirect('/listing');
}

// Get the edit page for current Place
async function editListPageHandler(req, res, next) {
    const id = req.params.id;
    const element = await List.findById(id);
    if (!element) {
        return next(new ExpressError(404, "No Place Found!"))
    }
    res.render('listings/editList.ejs', { element: element });
}

// Delete the current Place
async function deleteListHandler(req, res) {
    const id = req.params.id;
    await List.findByIdAndDelete(id);
    res.redirect('/listing');
}

// Get the form for the new Place post
async function getNewListPostHandler(req, res) {
    res.render('listings/postPlace.ejs');
}

// Post the new page on db
async function postNewPlaceHandler(req, res) {
    const body = req.body;
    await List.create({
        imgUrl: body.imgUrl,
        hotelLocation: body.hotelLocation,
        hotelPrice: body.hotelPrice,
        hotelDescription: body.hotelDescription
    });
    res.redirect('/listing');
}


module.exports = {
    listingPagehandler,
    indivisualListPageHandler,
    editListPageHandler,
    postEditedPageHandler,
    deleteListHandler,
    getNewListPostHandler,
    postNewPlaceHandler,
}