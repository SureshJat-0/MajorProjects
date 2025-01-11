const { List } = require('../models/list');

async function listingPagehandler(req, res) {
    const allLists = await List.find();
    res.render('allListingPage.ejs', {allLists: allLists});
}

async function indivisualListPageHandler(req, res) {
    const id = req.params.id;
    const listItem = await List.findById(id);
    res.render('indivisualList.ejs', {listItem: listItem});
}

async function editListPageHandler(req, res) {
    const id = req.params.id;
    const element = await List.findById(id);
    res.render('editList.ejs', {element: element});
}

module.exports = {
    listingPagehandler,
    indivisualListPageHandler,
    editListPageHandler,
}