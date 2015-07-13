module.exports = function(books){
  var api = {};

  //Note: the use of 'this' below refers to the koa object.
  api.user = require("./user.js")(books);
 
  api.test = function *() {
     //var response = yield books.user.test("something");
     var response = yield books.user.test;
     //console.log(response);
     response = {'test':'test'}
     this.type = 'application/json';
     this.body = JSON.stringify(response);
  }

  //call to be used when the api does not exist
  api.dne = function *(){
      this.type = 'json';
      this.response.status = 404;
      this.type = 'application/json';
      this.body = {"error":'The following path is invalid'};
  }

  //general call to confirm logged in status. Need to add the username to this
  api.loggedin = function *(){
    this.response.status = 200;
    this.type = 'application/json';
    this.body = {"success":"You are logged in"}
  }

  return api;
}//end exports