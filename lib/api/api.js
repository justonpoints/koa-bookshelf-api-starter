//update this to work like public_api
module.exports = function(postgres){
  var api = {};
  var database = postgres;

  //genral neo4j query, makes a call to return actors with the birth date supplied in "data"
  //required: date(number)
  api.get_test = function *() {
      var app = this;//this comes from the koa app. 
      var id = app.params.id;

      var response = yield postgres.selectById(id);
      app.type = 'text/json';
      app.body = JSON.stringify(response);
  }

  api.put_test = function *() {
      var app = this;
      var id = app.params.id;
      var post = app.request.body;

      var data = {match:id,update:post};

      var response = yield postgres.update(data);
      app.body = JSON.stringify(response);
  }

  api.post_test = function *() {
      var app = this;
      var post = app.request.body;

      var response = yield postgres.create(post);
      app.body = response;
  }

  api.delete_test = function *() {
      var app = this;
      var id = app.params.id;

      var response = yield postgres.delete(id);
      app.body = response;
  }

  api.list_test = function *() {
     
  }

  //call to be used when the api does not exist
  api.dne = function *(){
      this.type = 'json';
      this.response.status = 404;
      this.body = {"error":'The following path is invalid'};
  }

  //general call to confirm logged in status. Need to add the username to this
  api.loggedin = function *(){
    this.response.status = 200;
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