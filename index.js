//Philosophy, load all depedencies at initialization.

//------------------------------------------------------------------------------------------------------------------------
//node libraries, should also be contained in the /package.json file
var koa = require('koa');
var koa_router = require('koa-router');
var body = require('koa-body')();
var request = require('koa-request');
var session = require('koa-generic-session');
var mount = require('koa-mount');
var logger = require('koa-logger');
var limit = require('koa-better-ratelimit');
var pg = require('co-pg')(require('pg'));
var knex = require('knex')({
  client: 'postgresql',
  connection: {
    host     : 'localhost',
    port     : '5432',
    user     : 'postgres',
    password : 'postgres',
    database : 'node',
    charset  : 'UTF8_GENERAL_CI'
  }//move this to a config file.
});
var Bookshelf = require('bookshelf')(knex);
var passport = require('koa-passport');
var local = require('passport-local').Strategy;

//local libraries
var nodes = require('./lib/nodes.js');
var bookshelf = require('./lib/bookshelf.js')(Bookshelf);
var auth = require('./lib/auth')(passport,local);//authenticator
var api = require('./lib/api/api.js')(bookshelf);//main api, requires an authenticated session
var public_api = require('./lib/api/public_api.js')(auth);//api that can accessed without an active session.

//initializers
var app = koa();
var router = new koa_router(); //this is for the authenticated api
require('./lib/routes.js')(router, body, api);//intialize routes
var public_router = new koa_router();//for the non-authenicated api.
require('./lib/public_routes.js')(public_router, body, public_api);//intialize public routes
//------------------------------------------------------------------------------------------------------------------------

//-------Start Event Loop-------------------------------------------------------------------------------------------------
//__________________________________________________________________ 
//The component order is important.
//Each of the middleware component are organized into nodes that require the koa "app".
//They are called nodes, because of what they characterize. Each node represents a set of processes, and may include for than one app.use
// down flow (node1) => (node2) => ... (node x), upflow (node x) => .. => (node 1).
// Each Node can continue the flow, Split the flow*, or terminate the downflow. When the downflow if terminate, that the process works back up.
//__________________________________________________________________ 

//Error handler
nodes.error(app);

//Logger, write errors to the console
nodes.logger(app,logger,true);

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
nodes.validate(app);

//The following routes require a valid session.
//For routes see ./lib/routes.js
nodes.router(app,router,mount);

if (!module.parent) app.listen(1337);//move the port to a config file.
console.log('the Api is running on port 1337');

//------------------------------------------------------------------------------------------------------------------------



  