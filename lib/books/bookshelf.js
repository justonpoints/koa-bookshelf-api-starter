module.exports = function(bookshelf,checkin){
  //create shelf 
  var shelf = {}
  
  //add books to the shelf
  shelf.user = require('./user.js')(bookshelf,checkin);
  shelf.auth = require('./auth.js')(bookshelf,checkin);

  return shelf;
}//end exports