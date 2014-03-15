/*This file contains all the API handlers for the owner's actions on his own wish list. */
var connection = require('../data/dataConnection.js').connection;
var methods = require('../helperMethods/methods.js');
var gV = require('../globals/globalVariables.js');

/*
  body: {
    itemId: itemId, 
    descritpion : ""
  }
*/
// TODO If itemId does not exist populate the item Id also 
exports.addItems = function (req, res){
    var userId = req.params.userId; 
    var resMsg = "added items successfully";
    var resMsgErr = "Error in adding items";
    var wishId = methods.generateUUID (); // Check if the UUID already exists or not 
    var itemId = req.body.itemId;
    var description = req.body.description;
    methods.getWishListId (userId, function(err, obj){
	    if (err == undefined){
		var wishListId = obj.wishListId;
		var query = "Insert Into Wish_WishList (WishListId, WishId, ItemId, UserId, Description) Values ('" + 
                             wishListId + "','" + wishId + "','" + itemId +  "','" +  userId + "','" + description + "');";
		methods.runQuery(resMsg, resMsgErr, query, res);
	    } else {
		console.log ("Error in getting wishListId, error:" + err.msg);
		res.send (err);
	    }
    });
};

exports.getItems = function (req, res){
    var userId = req.params.userId;
    var query = "SELECT * FROM Wish_WishList As W JOIN Item_Details As I ON I.ItemId = W.ItemId WHERE UserId = '" + userId + "';";
    console.log ("In function getItems, query:" + query);
    var resMsg = "Get Items query successful";
    var resMsgErr = "Get Items query failed";
    methods.runQuery (resMsg, resMsgErr, query, res);
};

/*
  Expects 
*/

exports.removeItems = function (req, res){
    var userId = req.params.userId;
    console.log (req.body.items);
    var items = (JSON.parse (req.body.items)).itemArr;
    var query = "DELETE FROM Wish_WishList where ItemId IN (" + methods.arToStringArray (items) + ") AND UserID = '" + userId + "';";
    var resMsg = "Deleted Items successfully";
    var resMsgErr = "Error in deleting Items";
    methods.runQuery (resMsg, resMsgErr, query, res);
};

/*
   Expects an itemObject JSON
   body : {
     itemObj : {
        itemId : abc, 
	userId : usId,
	brand  : brand, 
	ApproxPrice  : price,
        IsReserved : IsReserved,
        IsAcquired : IsAcquired,
        ReservedBy : , 
        AcquiredBy : ,
	Description :
     }
*/
exports.editItems = function (req, res){
    var userId = req.params.userId;
    var itemObj = req.itemObj;
    var itemId = itemObj.itemId;
    var approxPrice = itemObj.ApproxPrice;
    var description = itemObj.Description;
    var query = "UPDATE ItemDetails SET (ApproxPrice = '" + itemObj.ApproxPrice +"',Description = '" + itemObj.Description + "') WHERE itemId = '" + itemId + "' AND userId = '" + userId + "';";
    methods.runQuery ("Items updated successfully", "Error in updating item" , query, res);
};
