// Costom class for error handel
class ExpressError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
}

// Error handler for the async functions
function asyncWrapErroHandler(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    }
}

module.exports = {
    ExpressError,
    asyncWrapErroHandler,
}