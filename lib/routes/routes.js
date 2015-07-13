module.exports = function(router,body,api){
  	router.get('/user/:id', api.get_user);
	//router.get('/user/list', api.list_test);
	router.put('/user/:id', body, api.put_user);
	router.delete('/user/:id', body, api.delete_user);
	router.post('/user', body, api.post_user);
	router.all('/loggedin', api.loggedin);
	router.all('/testing', api.test);
	router.all('/*', api.dne);
}//Check if the session is valid, if not throw a 400 error.
