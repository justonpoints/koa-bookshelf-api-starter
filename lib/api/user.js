//update this to work like public_api
module.exports = function(books){
  var user = {};

//-----------------------------------------------------
  user.getById = function *() {
      var id = this.params.id;

      var response = yield books.user.selectById(id);

      this.type = 'application/json';
      this.body = response;
  }

  user.getByName = function *() {
      var name = this.params.name;

      var response = yield books.user.selectByName(name);

      this.type = 'application/json';
      this.body = response;
  }

  user.getMe = function *() {
      var id = this.session.passport.user.id;
      var response = yield books.user.selectById(id);

      this.type = 'application/json';
      this.body = response;
  }
//-----------------------------------------------------

//-----------------------------------------------------
  user.put = function *() {
      var id = this.params.id;
      var post = this.request.body;
      var data = {id:id,update:post};

      var response = yield books.user.update(data);

      this.type = 'application/json';
      this.body = response;
  }

  user.putMe = function *() {
      var id = this.session.passport.user.id;
      var post = this.request.body;
      var data = {id:id,update:post};

      var response = yield books.user.update(data);

      this.type = 'application/json';
      this.body = response;
  }
//-------------------------------------------------------

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