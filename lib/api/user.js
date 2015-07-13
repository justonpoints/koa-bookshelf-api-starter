//update this to work like public_api
module.exports = function(books){
  var user = {};

  //genral neo4j query, makes a call to return actors with the birth date supplied in "data"
  //required: date(number)

  //Note: the use of 'this' below refers to the koa object.

  user.get = function *() {
      var id = this.params.id;

      var response = yield books.user.selectById(id);

      this.type = 'application/json';
      this.body = JSON.stringify(response);
  }

  user.put = function *() {
      var id = this.params.id;
      var post = this.request.body;
      var data = {id:id,update:post};

      var response = yield books.user.update(data);

      this.type = 'application/json';
      this.body = JSON.stringify(response);
  }

  user.post = function *() {
      var post = this.request.body;

      var response = yield books.user.create(post);

      this.type = 'application/json';
      this.body = JSON.stringify(response);
  }

  user.delete = function *() {
      var id = this.params.id;

      var response = yield books.user.delete(id);

      this.type = 'application/json';
      this.body = JSON.stringify(response);
  }

  return user;
}//end exports