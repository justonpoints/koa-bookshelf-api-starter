module.exports = function(router,body,api,restrict){
  	router.get('/user/:id', restrict.admin,api.user.get);
	router.put('/user/:id', body, api.user.put);
	router.delete('/user/:id', body, api.user.delete);
	router.post('/user', body, api.user.post);
	router.all('/loggedin', api.loggedin);
	router.all('/testing', api.test);
	router.all('/*', api.dne);
}//Check if the session is valid, if not throw a 400 error.