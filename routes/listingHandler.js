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
    const listItem = await List.findById(id).populate({ path: 'reviews', populate: { path: 'author' } }).populate('owner');
    // Error if id is not found in db
    if (!listItem) {
        req.flash('error', 'Listing you requested for does not exist!');
        return res.redirect('/listing');
        // return next(new ExpressError(404, 'No Place Found!'));
    }
    res.render('listings/individualList.ejs', { listItem: listItem });
}

// Post the edited Place to db
async function postEditedPageHandler(req, res, next) {
    const body = req.body;
    const id = req.params.id;
    const editedListing = { ...body };
    if (req.file && typeof req.file != 'undefined') {
        const { path, filename } = req.file;
        const image = { url: path, filename: filename }
        editedListing.image = image;
    }
    await List.findByIdAndUpdate(id, editedListing);
    req.flash('success', 'Listing Updated!');
    res.redirect('/listing');
}

// Get the edit page for current Place
async function editListPageHandler(req, res, next) {
    const id = req.params.id;
    const element = await List.findById(id);
    let previewUrl = element.image.url;
    previewUrl = previewUrl.replace('/upload', '/upload/w_250');
    if (!element) {
        req.flash('error', 'Listing you requested for does not exist!');
        res.redirect('/listing');
        // return next(new ExpressError(404, "No Place Found!"))
    }
    res.render('listings/editList.ejs', { element: element, previewUrl });
}

// Delete the current Place
async function deleteListHandler(req, res) {
    const id = req.params.id;
    await List.findByIdAndDelete(id);
    req.flash('success', 'Listing Deleted!');
    res.redirect('/listing');
}

// Get the form for the new Place post
async function getNewListPostHandler(req, res) {
    res.render('listings/postPlace.ejs');
}

// Post the new page on db
async function postNewPlaceHandler(req, res) {
    const body = req.body;
    const { path, filename } = req.file;
    await List.create({
        ...body
        , owner: req.user._id, image: { url: path, filename: filename },
    });
    req.flash('success', 'New Listing Created!');
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