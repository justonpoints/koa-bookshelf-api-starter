//module for handling the public router. Handels logging in, and possible public facing info. 
// Apis are contained in the /lib/api/public_api.js file
module.exports = function(app,public_router,mount,body,public_api){
		app.use(mount('/api',public_router.middleware()));
}