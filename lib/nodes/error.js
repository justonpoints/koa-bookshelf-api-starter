module.exports = function(app){
	//Wrap the app in a try/catch, if anything in the app throws an error then it will be caugh here for a 500 error.
	app.use(function *(next){
	try{
	    yield next; //pass on the execution to downstream middlewares
	} catch (err) { //executed only when an error occurs & no other middleware responds to the request
	    this.type = 'json'; 
	    this.status = err.status || 500;
	    console.log(err);
	    this.body = { 'error' : 'Something is wrong, not sure what it is'};
	    //delegate the error back to application
	    this.app.emit('error', err, this);
	    }
	});

	//Check if the body is null. If it is, then Record not found is returned to the user.
	app.use(function *(next){
	    yield next; //pass on the execution to downstream middlewares
		if(this.body === "null"){ //Checks the orm returns a "null" value. Note: the orm return "null" not null.
			this.status = 404;//404 for now.
			this.body = {warning:"Record Not found"}
		}
	});
}