module.exports = function(router,body,api){
  	router.get('/test/:id', api.get_test);
	router.get('/name/list', api.list_test);
	router.put('/test/:id', body, api.put_test);
	router.delete('/test/:id', body, api.delete_test);
	router.post('/test', body, api.post_test);
	router.all('/loggedin', api.loggedin);
	router.all('/*', api.dne);
}//Check if the session is valid, if not throw a 400 error.
