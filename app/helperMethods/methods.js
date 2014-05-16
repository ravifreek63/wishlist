var gV = require('../globals/globalVariables.js');
var string = require ('string');
var _ = require('underscore');
var uuid = require('node-uuid');
var connection = require('../data/dataConnection.js').connection;


var createResponse = function createResponse (code, message, status, miscellaneous, callback){
    var responseObject = {
	'code' : code, 
	'message' : message,
	'status' : status, 
	'miscellaneous' : miscellaneous
    };
    if (callback){
	if (code == gV.success.code)
	    callback (undefined, responseObject);
	else 
	    callback({error: miscellaneous.error});
    } else {
	console.log('In function createResponse, callback passed as empty');
    }
};
exports.createResponse = createResponse;

var arToStringArray = function arToStringArray (array){
    console.log (array[0]);
    return string((_.map(array, function(num){ return "'" + num + "'"}))).toString();
};

exports.arToStringArray = arToStringArray;

var generateUUID = function generateUUID (){
    return uuid.v4();
};

exports.generateUUID = generateUUID;

var runQuery = function runQuery (resMsg, resMsgErr, query, res){
    var resCb = function (error, resObj){
        if (error != undefined)
            console.log (resMsgErr + ":" + error);
	res.send (JSON.stringify({error: error, response :resObj}));
    };
    var queryHandler = function (err, rows){
        if (err == undefined){
            var qResObj = {
                rows: rows
            };
            createResponse (gV.success.code, resMsg, gV.success.status, qResObj, resCb);
        } else {
            console.log ("Err:" + err + ", query:" + query);
            createResponse (gV.failure.code, resMsgErr, gV.failure.status, {error: err},  resCb);
        }
    };
    console.log (query);
    connection.query(query, queryHandler);
};

exports.runQuery = runQuery;

var getWishListId = function (userId, callback){
    var query = "Select * from User_WishList where UserId='" + userId + "';";
    connection.query (query, function(err, rows, fields){
            if (err == undefined){
                var wishListId = rows[0].WishListId;
                callback (undefined, {wishListId: wishListId});
            } else {
                console.log ("Error in getting wishList Id, error: " + err + " query:" + query);
                callback({msg: err});
            }
	});
};

exports.getWishListId = getWishListId;

var generateWishList = function generateWishList (wishListId, userId, callback){
    var query = "INSERT INTO User_WishList (UserId, WishListId) VALUES ('" + userId + "', '"+ wishListId + "');";

    connection.query (query, function(err, rows, fields){
	    if (err != undefined)
		console.log ("Error in inserting wishlistid into wishlist table, error:" + err);
	    callback (err, { rows : rows, fields: fields});
   });    
};
exports.generateWishList = generateWishList;

var logQuery = function(query){
    console.log ("Running Query:" + query)
};
exports.logQuery = logQuery;

var queryError = function(error, query){
    console.log("Error(" + error + ") in running query(" + query + ")");
};
exports.queryError = queryError;

var queryBuilder = function(tableName, fields, type){
    switch (type) {
        case gV.queryTypes.INSERT:
            var query = "INSERT INTO " + tableName + "(";
            var index = 0;
            var keys = [];
            var values = [];
            for(var attributename in fields){
                keys[index] = attributename;
                values[index] = "'" + fields[attributename] + "'";
                index++;
            }
            query = query + arToList(keys) + ")";
            query = query + " VALUES " + "(" + arToList(values)  +");";
            break;
    }
    return query;
};
exports.queryBuilder = queryBuilder;

// converts an array to a comma separated collection of strings
var arToList = function(array){
    var str = "";
    array.forEach (function(element){
        str = str + element + ",";
    });
    // returning the substring to remove the last comma
    return str.substring(0, str.length-1);
};

