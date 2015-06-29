module.exports = function(app,router,mount,body,api){
  router.get('/test/:id', validate, api.get_test);
  router.get('/name/list', validate, api.list_test);
  router.put('/test/:id', validate, body, api.put_test);
  router.delete('/test/:id', validate, body, api.delete_test);
  router.post('/test', validate, body, api.post_test);
  router.all('/loggedin', validate, api.loggedin);
  router.all('/*', validate, api.dne);
	app.use(mount('/api', router.middleware()));//mount all the routes to the app
}

//Check if the session is valid, if not throw a 400 error.
function *validate(next){
  app = this;
  if (app.req.isAuthenticated()){
    yield next;
  } else {
    this.status = 400;//update this to an api
    this.body = {"error":"no active session"}
  }
}