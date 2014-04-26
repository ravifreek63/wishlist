/* This file contains handlers for the owner's friend list (both viewing and editing). */

var methods = require('../helperMethods/methods.js');
var connection = require('../data/dataConnection.js').connection;
var gV = require('../globals/globalVariables.js');
var check = require('validator').check,
    sanitize = require('validator').sanitize

/* The (temporary) view */
exports.friend_list_view = function (req, res){
    var userId = req.params.userId;
    res.render('friend_list', { userId: userId });
};

/* Return all of the friends for a user. */
exports.getFriends = function (req, res){
    var userId = req.params.userId;
    var query = "SELECT AD.Name, AD.UserId, GR.RelationshipAlias FROM Group_Relationships AS GR JOIN Account_Details AS AD ON GR.RelativeId = " +
        "AD.UserId WHERE GR.UserId = '"+userId+"';";
    console.log("In function getFriends, query:"+query);
    var resMsg = "Get Friends query successful";
    var resMsgErr = "Get Friends query failed";
    methods.runQuery(resMsg, resMsgErr, query, res);
};

/* add a friend */
exports.addFriend = function (req, res) {
    var userId = req.params.userId;
    var alias = req.body.alias;
    var relationShipAlias = alias;
    var emailId = req.body.emailId;
    // Check whether the email Id exists
    var resMsg = "added friend successfully";
    var resMsgErr = "Error adding friend";
    var query1 = "SELECT * from Account_Details Where EmailId='"+ emailId+"';";
    methods.logQuery(query1);
    function sendResponse (err, obj) {
        res.send(JSON.stringify({
            error: err,
            response: obj
        }));
    }
    function accDetails(err, rows){
        if (err == undefined) {
            if (rows.length > 0) { // If the user account already exists
                var relativeId = rows[0].UserId;
                if (relationShipAlias == undefined) {
                    relationShipAlias = rows[0].Name;
                    if (relationShipAlias == undefined || relationShipAlias == null || relationShipAlias == "") {
                       relationShipAlias = rows[0].EmailId;
                    }
                }
                var fields = {UserId: userId, RelativeId: relativeId, GroupId: 1, RelationshipAlias: relationShipAlias};
                var query = methods.queryBuilder (gV.tableNames.Relationships, fields, gV.queryTypes.INSERT);
                methods.runQuery(resMsg, resMsgErr, query, res);
            } else if (rows.length == 0){ // If the account does not exist
                // Create a non activated account
                var relativeId = methods.generateUUID (); // Check for duplicate UUID
                var password = "";
                var type = 2;
                var name  ="";
                var activated = 0;
                var fields = {UserId: relativeId, Password: password, Type: type, Name:name, EmailId: emailId, Activated: activated};
                var createAccountQuery = methods.queryBuilder (gV.tableNames.Account_Details, fields, gV.queryTypes.INSERT);
                methods.logQuery("createAccountQuery:" + createAccountQuery);
                function accountCreationHandler (err) {
                    if (err ==  undefined) {
                        if (relationShipAlias == undefined)
                           relationShipAlias = emailId;
                        var fields = {UserId: userId, RelativeId: relativeId, GroupId: 1, RelationshipAlias: relationShipAlias};
                        var relationshipQuery = methods.queryBuilder (gV.tableNames.Relationships, fields, gV.queryTypes.INSERT);
                        methods.logQuery("relationshipQuery:" + relationshipQuery);
                        methods.runQuery(resMsg, resMsgErr, relationshipQuery, res);
                    } else {
                        methods.queryError(err, createAccountQuery);
                        res.send (err);
                    }
                }
                connection.query(createAccountQuery, accountCreationHandler);
            }
        } else {
            methods.queryError(err, query1);
            methods.createResponse (gV.failure.code, resMsgErr, gV.failure.status, {error: err},  sendResponse);
        }
    }
    connection.query(query1, accDetails);
};

/* remove a friend */
exports.removeFriend = function (req, res) {
    var userId = req.params.userId;
    var friendToRemove = req.body.name;
    var relationshipId = req.body.id;
    var resMsg = "removed friend successfully";
    var resMsgErr = "Error removing friend";
    var query = "DELETE FROM Group_Relationships WHERE Id = "+relationshipId+";";
    methods.runQuery(resMsg, resMsgErr, query, res);
};

/* invite a friend */
exports.inviteFriend = function (req, res) {
    // TODO: Needs implementation.
};

/* edit a friend */
exports.editFriend = function (req, res) {
    // TODO: Needs implementation.
};
