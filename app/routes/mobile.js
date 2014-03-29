/* This file contains handlers for calls from mobile devices. */

var methods = require('../helperMethods/methods.js');

/* Add a wish */
exports.addWish = function (req, res) {
    var userId = req.body.userId;
    var wishName = req.body.wishName;
    var wishDescrption = req.body.wishDescription;

    res.send("Dummy response. Should add wish '"+wishName+"' for user with userId '"+userId+"'.");
};
