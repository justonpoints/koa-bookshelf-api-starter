//update this to work like public_api
module.exports = function(books){
  var api = {};

  //genral neo4j query, makes a call to return actors with the birth date supplied in "data"
  //required: date(number)

  //Note: the use of 'this' below refers to the koa object.

  api.get_test = function *() {
      var id = this.params.id;

      var response = yield books.user.selectById(id);

      this.type = 'application/json';
      this.body = JSON.stringify(response);
  }

  api.put_test = function *() {
      var id = this.params.id;
      var post = this.request.body;
      var data = {id:id,update:post};

      var response = yield books.user.update(data);

      this.type = 'application/json';
      this.body = JSON.stringify(response);
  }

  api.post_test = function *() {
      var post = this.request.body;

      var response = yield books.user.create(post);

      this.type = 'application/json';
      this.body = JSON.stringify(response);
  }

  api.delete_test = function *() {
      var id = this.params.id;

      var response = yield books.user.delete(id);

      this.type = 'application/json';
      this.body = JSON.stringify(response);
  }

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

  //generic template if api request contains a bad parameter
  function bad_parameter(app,message){
      app.type = 'json';
      app.response.status = 400;
      app.body = {"error":"bad parameter","message": message};
  }
   
  //generic template if an api is missing a paramter
  function missing_parameter(app,message){
      app.type = 'json';
      app.response.status = 400;
      app.body = {"error":"missing parameter","message":message};
  }  

  return api;
}//end exports