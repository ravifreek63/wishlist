var connection = require('../data/dataConnection.js').connection;
var methods = require('../helperMethods/methods.js');
var gV = require('../globals/globalVariables.js');

/*
 *  The home page after login.
 */

exports.home = function(req, res){
    var userId = req.params.userId;
    var query = "SELECT Name,ContactNumber,EmailId from Account_Details where UserId = '" + userId + "' LIMIT 1;";
    console.log (query);
    var query1 = "SELECT * from Wish_WishList AS W JOIN Item_Details AS I ON W.ItemId = I.ItemId where UserId= '" + userId + "';";
    function queryHandler(err, rows) {
        if (err == undefined) {
            function queryHandler1(err1, rows1){
                if (err1 == undefined){
                    res.render('home', { userId: userId, name: rows[0].Name, emailId: rows[0].EmailId,
                        wishes: rows1 });
                }
            }
            connection.query(query1, queryHandler1);
        }
    }
    connection.query(query, queryHandler);
};

exports.homedemo = function(req, res){
    var userId = req.params.userId;
    res.render('homedemo', { userId: userId });
};

exports.logout = function(req, res){
    req.session.destroy(function(){
       console.log ("logging out"); 
       res.send("logged out");
    });

};
