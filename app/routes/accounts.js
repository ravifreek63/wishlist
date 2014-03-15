var methods = require('../helperMethods/methods.js');
var gV = require('../globals/globalVariables.js');
var string = require('string');
var connection = require('../data/dataConnection.js').connection;
/* body : {
   userObj : {
   }
   }
*/
exports.createAccount = function createAccount (req, res){
    var userObj = JSON.parse(req.body.userObj);
    var name = userObj.name;
    var emailId = string(userObj.emailId).toString().trim();
    var password = userObj.password;
    var type = 2; // Normal User is 2, Admin is type 1
    var userId = methods.generateUUID (); // Check for duplicate UUID
    var query = "INSERT INTO Account_Details (UserId, Password, Type, EmailId, Name) VALUES ('"+
                  userId +"','" + password + "', '"+type+ "','" + emailId + "', '"+name+"');";
    console.log ("Query:" + query);
    var resMsg = "Successful Creation of User Account";
    var resMsgErr = "Error in User Account Creation";
    // Generating an empty wishlist for this user 
    var wishListId = methods.genertateUUID ();
    methods.generateWishList (wishListId, userId, function(err, obj){
	    if (err == undefined)
		methods.runQuery(resMsg, resMsgErr, query, res);
	    else 
		res.send (err);
   });
};

exports.signIn = function signIn (req, res){
    var userObj = JSON.parse(req.body.userObj);
    var emailId = string(userObj.emailId).toString().trim();
    var password = userObj.password;
    var query = "SELECT * FROM Account_Details where emailId = '" + emailId + "';"
    connection.query (query, function(err, rows, fields){
	    if (err == undefined){
		if (rows && rows.length > 0){
		    if (password == rows[0].Password){
			methods.createResponse (gV.success.code, "Login Successful", 
						gV.success.status, {}, sendResponse);
		    } else {
			methods.createResponse(gV.failure.code, "Login Failed, Password did not match", 
					       gV.failure.status, {}, sendResponse);
		    }
		} else {
		    console.log ("Account Does Not Exist, EmailId" + emailId);
		    methods.createResponse (gV.success.code, "Account Does Not Exist",
					    gV.otherStatus.accountNonExistent, {}, sendResponse);
		}			
	    } else {
		console.log ("Error in getting account details, error:" + err + ", query:" + query);
		res.send (JSON.stringify({error: err}));
	    }
    });
var sendResponse = function (err, obj){
     res.send (JSON.stringify({
		    error: err,
		    response :obj
     }));
};
};
