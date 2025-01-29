const joi = require('joi');
const { ExpressError } = require('./errorHandler');

// Validating form data while posting new place
const joiFormValidationSechema = joi.object({
    body: joi.object({
        hotelTitle: joi.string().required(),
        hotelDescription: joi.string().required(),
        hotelPrice: joi.number().required(),
        hotelCountry: joi.string().required(),
        hotelLocation: joi.string().required(),
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


// Validation of reviews
const joiReviewValidationSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5),
        comment: joi.string().required(),
    }).required()
});

function validateReviewJoi(req, res, next) {
    const review = req.body.review;
    const { error, value } = joiReviewValidationSchema.validate({ review });
    if (error) {
        throw new ExpressError(400, error.message);
    } else {
        next()
    }
}


module.exports = {
    validateListingJoi,
    validateReviewJoi,
};