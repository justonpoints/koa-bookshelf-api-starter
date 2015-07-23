module.exports = function(app){
	//Wrap the app in a try/catch, if anything in the app throws an error then it will be caugh here for a 500 error.
	app.use(function *(next){
	try{
	    yield next; //pass on the execution to downstream middlewares
	} catch (err) { //executed only when an error occurs & no other middleware responds to the request
	    this.type = 'json'; 
	    this.status = err.status || 500;
	    this.body = { 'error' : 'Something is wrong, not sure what it is'};
	    //delegate the error back to application
	    this.app.emit('error', err, this);
	    }
	});

	//Check if the body is null. If it is, then Record not found is returned to the user.
	app.use(function *(next){
	    yield next; //pass on the execution to downstream middlewares
		if(this.body.error !== undefined){ //Checks the orm returns a "null" value. Note: the orm return "null" not null.
			console.log(this.body.error);
			switch(this.body.error.code){
				case 1:
					this.body.error.message = "No Active Session"; 
					this.response.status = 401;
					break;
				case 2:
					this.body.error.message = "Bad Credentials"; 
					this.response.status = 401;
					break;
				case 3: 
					this.body.error.message = "Record Not Found";
					this.response.status = 404;
					break;
				case 4:
					this.body.error.message = "The Request Path is Invalid";
					this.response.status = 404;
					break;
				default:
					this.body.error.message ="Bad Request";
					this.body.error.code = 0; 
					this.response.status = 400;
					break;
			}
		}
	});
}