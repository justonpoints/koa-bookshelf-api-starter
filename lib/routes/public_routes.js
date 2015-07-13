module.exports = function(public_router,body,public_api){
		public_router.all('/login',body,public_api.login);
		public_router.all('/logout',public_api.logout);
}