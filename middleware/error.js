const colors = require('colors');
const errorHandler = (err, req, res, next) => {
    console.log(`${err}`.underline.cyan);

    res.status(500).json({
        success : false,
        error: err.message,
    })
};

module.exports = errorHandler;