//module for handling the public router. Handels logging in, and possible public facing info. 
// Apis are contained in the /lib/api/public_api.js file
module.exports = function(app,public_router,mount,body,public_api){
		public_router.all('/login',body,public_api.login);
		public_router.all('/logout',public_api.logout);
		app.use(mount('/api',public_router.middleware()));
}