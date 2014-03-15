/*This file contains all the API handlers for the owner's actions on his own wish list. */
var connection = require('../data/dataConnection.js').connection;
var methods = require('../helperMethods/methods.js');
var gV = require('../globals/globalVariables.js');
var _ = require('underscore');

exports.addItems = function (req, res){
    var userId = req.params.userId; 
    console.log ("userId: " + userId);
    var resMsg = "added items successfully";
    var resMsgErr = "Error in adding items";
    var itemId = methods.generateUUID (); // Check if the UUID already exists or not 
    var query = "Insert Into ItemDetails (itemId, userId) Values ('" +itemId+ "','" +  userId + "');";
    runQuery(resMsg, resMsgErr, query, res);    
};

exports.getItems = function (req, res){
    var userId = req.params.userId;
    console.log ("userId:" + userId);
    var query = "SELECT * from ItemDetails where UserId = '" + userId + "';";
    console.log ("In function getItems, query:" + query);
    var resMsg = "Get Items query successful";
    var resMsgErr = "Get Items query failed";
    runQuery (resMsg, resMsgErr, query, res);
};

/*
  Expects 
*/

exports.removeItems = function (req, res){
    var userId = req.params.userId;
    console.log (req.body.items);
    var items = (JSON.parse (req.body.items)).itemArr;
    console.log (_.isArray(items));
    var query = "DELETE FROM ItemDetails where itemId IN (" + methods.arToStringArray (items) + ") AND userID = '" + userId + "';";
    var resMsg = "Deleted Items successfully";
    var resMsgErr = "Error in deleting Items";
    runQuery (resMsg, resMsgErr, query, res);
};

/*
   Expects an itemObject JSON
   body : {
     numItems: 2,
     itemObjArr :[
     itemObj : {
        itemId : abc, 
	userId : usId,
	brand  : brand, 
	price  : price
     }
     ]
   }
 
*/
exports.editItems = function (req, res){
    var userId = req.params.userId;
    var itemObj = req.itemObjArr[0].itemObj;
    var query = "UPDATE ItemDetails SET (brand = '" + itemObj.brand +"',price = '" + itemObj.price + "') WHERE itemId = '" + itemId + "' AND userId = '" + userId + "';";
    runQuery ("Items updated successfully", "Error in updating item" , query, res);
};

var runQuery = function runQuery (resMsg, resMsgErr, query, res){
    var resCb = function (error, resObj){
        if (error.error) {
            console.log (resMsgErr + ":" + error);
        }
        res.send (error, resObj);
    };
    var queryHandler = function (err, rows, fields){
        if (err == undefined){
            var qResObj = {
                rows: rows,
                fields: fields
            };
	    
            methods.createResponse (gV.success.code, resMsg, gV.success.status, qResObj, resCb);
        } else {
            console.log ("Err:" + err + ", query:" + query);
            methods.createResponse (gV.failure.code, resMsgErr, gV.failure.status, {error: err},  resCb);
        }
    };
    console.log (query);
    connection.query(query, queryHandler);
}