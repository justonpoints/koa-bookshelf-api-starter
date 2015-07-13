module.exports = function(app,limit){
	app.use(
		limit(
			{
				duration:1000 * 60 * 60 * 24, //24 hours, session last 24 hours
				max: 10000,//integrer, maximum number of requests before being blocked 
				blacklist: [],//array of ip strings
				whitelist:[],//array of ip strings
				accessLimited:"You have made too many requests",//string for 429 error
				accessForbidden:"Go away, you are not welcome here."//string for 403 error
			}
		)
	);
}