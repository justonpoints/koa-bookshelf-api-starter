module.exports = function(router,body,api,restrict){
	router.get('/user/me', api.user.getMe);
  	router.get('/user/:id([0-9]+)', restrict.admin, api.user.getById);
  	router.get('/user/:name', restrict.admin,api.user.getByName);
	
	router.put('/user/me', body, api.user.putMe);
	router.put('/user/:id', body, api.user.put);

	router.delete('/user/:id', body, api.user.delete);
	router.post('/user', body, api.user.post);
	router.all('/loggedin', api.loggedin);
	router.all('/testing', api.test);
	router.all('/*', api.dne);
}//Check if the session is valid, if not throw a 400 error.