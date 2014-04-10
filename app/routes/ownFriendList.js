/* This file contains handlers for the owner's friend list (both viewing and editing). */

var methods = require('../helperMethods/methods.js');

/* The (temporary) view */
exports.friend_list_view = function (req, res){
    var userId = req.params.userId;
    res.render('friend_list', { userId: userId });
};

/* Return all of the friends for a user. */
exports.getFriends = function (req, res){
    var userId = req.params.userId;
    var query = "SELECT * FROM Group_Relationships AS GR JOIN Account_Details AS AD ON GR.RelativeId = " +
        "AD.UserId WHERE GR.UserId = '"+userId+"';";
    console.log("In function getFriends, query:"+query);
    var resMsg = "Get Friends query successful";
    var resMsgErr = "Get Friends query failed";
    methods.runQuery(resMsg, resMsgErr, query, res);
};

/* add a friend */
exports.addFriend = function (req, res) {
    var userId = req.params.userId;
    var name = req.body.friendName;
    var resMsg = "added friend successfully";
    var resMsgErr = "Error adding friend";
    var query = "INSERT INTO Group_Relationships (UserId, Name) Values ('"+userId+"','"+name+"');";
    methods.runQuery(resMsg, resMsgErr, query, res);
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
