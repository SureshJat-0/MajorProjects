const { List } = require('../models/list');

async function listingPagehandler(req, res) {
    const allLists = await List.find();
    res.render('allListingPage.ejs', { allLists: allLists });
}

async function indivisualListPageHandler(req, res) {
    const id = req.params.id;
    const listItem = await List.findById(id);
    res.render('indivisualList.ejs', { listItem: listItem });
}

async function editListPageHandler(req, res) {
    const id = req.params.id;
    const element = await List.findById(id);
    res.render('editList.ejs', { element: element });
}

async function postEditedPageHandler(req, res) {
    const body = req.body;
    const id = req.params.id;
    await List.findByIdAndUpdate(id, {
        imgUrl: body.imgUrl,
        hotelLocation: body.hotelLocation,
        hotelPrice: body.hotelPrice,
        hotelDescription: body.hotelDescription
    })
    res.redirect('/listing');
}

async function deleteListHandler(req, res) {
    const id = req.params.id;
    await List.findByIdAndDelete(id);
    res.redirect('/listing');
}

async function getNewListPostHandler(req, res) {
    res.render('postPlace.ejs');
}

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