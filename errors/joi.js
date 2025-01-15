const joi = require('joi');
const { ExpressError } = require('./errorHandler');

const joiFormValidationSechema = joi.object({
    body: joi.object({
        imgUrl: joi.string().required(),
        hotelPrice: joi.number().required(),
        hotelLocation: joi.string().required(),
        hotelDescription: joi.string().required(),
    }).required(),
});

function validateListingJoi(req, res, next) {
    const body = req.body;
    const { error, value } = joiFormValidationSechema.validate({ body });
    if (error) {
        throw new ExpressError(400, error.message);
    } else {
        next()
    }
}

module.exports = validateListingJoi;