//Philosophy, load all depedencies at initialization.

//enviroment
var db_env = require('./knexfile.js').development


//node libraries, should also be contained in the /package.json file
//------------------------------------------------------------------------------------------------------------------------
var koa = require('koa');
var koa_router = require('koa-router');
var body = require('koa-body')();
var request = require('koa-request');
var session = require('koa-generic-session');
var mount = require('koa-mount');
var logger = require('koa-logger');
var limit = require('koa-better-ratelimit');
var pg = require('co-pg')(require('pg'));
var knex = require('knex')(db_env);
var Bookshelf = require('bookshelf')(knex);
var checkit = require("checkit");
var passport = require('koa-passport');
var local = require('passport-local').Strategy;
//------------------------------------------------------------------------------------------------------------------------


//local libraries
//------------------------------------------------------------------------------------------------------------------------
//These are sets of app.use statments. They are the primary building blocks of the app.
var nodes = require('./lib/nodes/nodes.js');

//The collection of database models/books.
var bookshelf = require('./lib/books/bookshelf.js')(Bookshelf,checkit);

//The collection of queries/pages
var books = require('./lib/pages/books.js')(bookshelf);

//Autentication setup
var auth = require('./lib/routes/auth')(passport,local,books.auth);//authenticator

//The main api for the app. Should not be qaccessed unless the session is authenticated.
var api = require('./lib/api/api.js')(books);//main api, requires an authenticated session

//The api that is universally accessible. 
var public_api = require('./lib/api/public_api.js')(auth);//api that can accessed without an active session.
//------------------------------------------------------------------------------------------------------------------------

//initializers
var app = koa();//Start Koa
var router = new koa_router(); //this is for the authenticated api
require('./lib/routes/routes.js')(router, body, api);//intializes routes
var public_router = new koa_router();//for the non-authenicated api.
require('./lib/routes/public_routes.js')(public_router, body, public_api);//intialize public routes
//------------------------------------------------------------------------------------------------------------------------



//-------Start Event Loop-------------------------------------------------------------------------------------------------
//__________________________________________________________________ 
//The component order is important.
//Each of the middleware component are organized into nodes that require the koa "app".
//They are called nodes, because of what they characterize. Each node represents a set of processes, and may include for than one app.use
// down flow (node1) => (node2) => ... (node x), upflow (node x) => .. => (node 1).
// Each Node can continue the flow, Split the flow*(planned), or terminate the downflow. When the downflow if terminate, that the process works back up.
//__________________________________________________________________ 
// (logger) => (error) => (limiter) => (session) => (public routes) => (authentication check) => (authenticated routes)

//Logger, write errors to the console
nodes.logger(app,logger,true);

//Error handler
nodes.error(app);

//limiter
nodes.limiter(app,limit);

//session and authentication handler
nodes.session(app,session,auth);

//routes accessible without a session. This includes login and log out.
// If route matches public api, then process the route. Terminate downflow
// If route does not match public route, then move to validation.
nodes.public_router(app,public_router,mount,body,public_api);

//validate session
// If validated, move to public routes.
// If not validated, then return 400 error.
nodes.authenticated(app);

//The following routes require a valid session.
//For routes see ./lib/routes.js
nodes.router(app,router,mount);

if (!module.parent) app.listen(1337);//move the port to a config file.
console.log('the Api is running on port 1337');

//------------------------------------------------------------------------------------------------------------------------



  