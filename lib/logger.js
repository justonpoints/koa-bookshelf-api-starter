//Just contains the logger function for now.
module.exports = function(app,logger,active){
	if(active === true){
		app.use(logger());
	}
}







