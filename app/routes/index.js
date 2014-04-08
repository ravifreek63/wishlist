
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('landingPage', { title: 'Express' });
};

