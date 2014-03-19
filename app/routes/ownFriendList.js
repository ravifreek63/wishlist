/* This file contains handlers for the owner's friend list (both viewing and editing). */

/* The (temporary) view */
exports.friend_list_view = function (req, res){
    var userId = req.params.userId;
    res.render('friend_list', { userId: userId });
};

/* Return all of the friends for a user. */
exports.getFriends = function (req, res){
    // TODO: This is just temporary code.
    res.writeHead(200, {'content-type': 'text/json' });
    res.write( JSON.stringify({friends: ["Adam","Benny","Carl"]}) );
    res.end('\n');
};

/* add a friend */
exports.addFriend = function (req, res) {
    // TODO: Needs implementation.
};

/* remove a friend */
exports.removeFriend = function (req, res) {
    var userId = req.params.userId;
    var friendToRemove = req.body.removeFriendWithName;
    res.writeHead(200, {'content-type': 'text/json' });
    res.write( JSON.stringify({status: "removed"} ));
    res.end('\n');
};

/* invite a friend */
exports.inviteFriend = function (req, res) {
    // TODO: Needs implementation.
};

/* edit a friend */
exports.editFriend = function (req, res) {
    // TODO: Needs implementation.
};
