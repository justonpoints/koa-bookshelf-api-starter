module.exports = function(shelf){
  //load the pages into the book.
  var books = {}

  //add pages to the books
  books.user = require("./user.js")(shelf.user);
  books.auth = require("./auth.js")(shelf.auth);

  return books;
}//end exports