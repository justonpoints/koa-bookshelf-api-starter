//organizes the nodes used by the app. 
module.exports = {
	authenticated:require("./authenticated.js"),
	error:require("./error.js"),
	limiter:require("./limiter.js"),
	logger:require("./logger.js"),
	public_router:require("./public_router"),
	router:require("./router.js"),
	session:require("./session.js")
}