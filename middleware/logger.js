const logger = (req, res, next) => {

    req.userId = "qonbjwnf";
    console.log(`${req.method} ${req.protocol}://${req.hostname}${req.originalUrl}`);
    next(); // ene daraagiin ajil ruu shiljuuldeg eniig zaaval bichihgui bol zogschihno 
}


module.exports = logger;