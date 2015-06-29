//create the basic session to be used.

module.exports = function(app,session,auth){
	app.keys = ['eriugheirughr-eruigjeirughieurghieurhg-0294875gh92340h5g'];//your key, do not use this one it is my secret key.
	app.use(session());
	app.use(auth.initialize());
	app.use(auth.session());
	//review this, make sure its all square.
}