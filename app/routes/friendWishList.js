/*This file contains all the API handlers for the owner's actions on his own wish list. */
var connection = require('../data/dataConnection.js').connection;
var methods = require('../helperMethods/methods.js');
var gV = require('../globals/globalVariables.js');




var getFriendIds;
getFriendIds = function (rows) {
    var friends = [];
    rows.forEach(function (row) {
        friends.push(row.RelativeId);
    });
    return friends;
};

exports.getWishLists = function(req, res){
    var resCb = function (error, resObj){
    if (error != undefined)
        console.log ("Error in getting wish lists:" + error);
    res.send (JSON.stringify({error: error, response :resObj}));
   };

    var userId = req.params.userId;
    var query = "SELECT * from Group_Relationships where userId = '" + userId + "';"; // Getting the list of all the users, who are friends of this user
    function queryHandler2 (err, rows){
        if (err == undefined){
            var responseObj = {
                "rows": rows
            };
            console.log ("successfully got wish lists for friends of " + userId);
            methods.createResponse (gV.success.code, "wish lists found" , gV.success.status, responseObj, resCb)
        } else {
            console.log ("error:" + err + ", while getting the wish lists for the friends of user:" + userId +", " +
                " query:" + query);
            methods.createResponse (gV.failure.code, err, gV.failure.status, {error: err},  resCb);
        }
    }

    function queryHandler (err, rows){
        if (err == undefined){
            if (rows.length > 0) {
                var friends = getFriendIds (rows);
                var query1 = "SELECT * FROM Wish_WishList As W JOIN Item_Details As I ON I.ItemId = W.ItemId AND W.UserId In (" + methods.arToStringArray (friends) + ");";
                console.log ("running query:" + query1);
                connection.query(query1, queryHandler2);
            } else {
                var qResObj = {
                    wishLists: []
                };
                console.log ("no friends exist");
                methods.createResponse (gV.success.code, "no friends exist" , gV.success.status, qResObj, resCb);
            }
        } else {
            console.log ("Error in getting the list of friends for user: " + userId + "query:" + query);
            methods.createResponse (gV.failure.code, err, gV.failure.status, {error: err},  resCb);
        }
    }
    connection.query(query, queryHandler);

};


exports.reserveItem = function (req, res){
    var userId = req.params.userId;
    var wishId = req.body.wishId;
    var friendId = req.body.friendId;
    var query = "UPDATE Wish_WishList SET IsReserved = 1, ReservedBy='" + userId
                 + "' where WishId = '" + wishId + "' AND UserId = '" + friendId + "';";
    var resMsg = "Updated Items successfully";
    var resMsgErr = "Error in updating Items";
    methods.runQuery (resMsg, resMsgErr, query, res);
};