
/*
 *  The home page after login.
 */

exports.home = function(req, res){
    var userId = req.params.userId;
    res.render('home', { userId: userId });
};

exports.homedemo = function(req, res){
    var userId = req.params.userId;
    res.render('homedemo', { userId: userId });
};
