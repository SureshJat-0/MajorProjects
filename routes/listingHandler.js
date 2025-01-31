const { ExpressError } = require('../errors/errorHandler');
const { List } = require('../models/list');
// geo map 
const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});

// console.log(coordiantes);

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
    let newListing = await List.create({
        ...body
        , owner: req.user._id, image: { url: path, filename: filename },
    });
    // map data 
    const geoResponse = await client.geocode({
        params: {
            address: body.hotelLocation,
            key: process.env.GOOGLE_MAP_API_KEY,
        },
    });
    if (geoResponse.data.status !== "OK") {
        throw new ExpressError(404, "Geocoding failed: " + geoResponse.data.status);
    }
    newListing.geometry.coordinates.lat = geoResponse.data.results[0].geometry.location.lat;
    newListing.geometry.coordinates.lng = geoResponse.data.results[0].geometry.location.lng;
    newListing.save();

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