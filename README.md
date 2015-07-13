# koa-bookshelf-api
Koa Bookshelf passport starter files

install : node, postrges(create a database)

1. git clone https://github.com/justonpoints/koa-bookshelf-api-starter.git
2. npm install (in the root of the app)
3. In Postgres, create a db to connect to.
3. Add Postgres creds to knexfile.js. (Use the development enviroment to start)
4. Run the migration to create the desired tables, and seed them. (npm run migration-seed)
5. node --harmony index.js (in the root of the app, --harmony required since we are using generators)
6. npm run test (If all green then you are good to go)

Sample:
	- Login : http://localhost:1337/api/login 
	- Create : http://localhost:1337/api/user (Post) {name:string,password:string[min:5]}
	- SelectById : http://localhost:1337/api/user/{id} (GET)
	- Update : http://localhost:1337/api/user/{id} (PUT) {name or password} --plan move update password elsewhere.
	- DELETE : http://localhost:1337/api/user/{id} (DELETE)

Quick reference to add an api in this enviroment.
1. Create migration file. (add seed data if desired)
2. Create a book in the /lib/books directory, add the book to the bookshelf in /lib/booksbookshelf.js (see bookshelf.js)
3. Create pages for the book in /lib/pages, add the pages to the desired book in /lib/books/books.js.
4. Create an Api that reads the pages in /lib/api. --this section needs to be organized better.
5. In /libs/routes, add routes to the api location.

Current flow
(logger): logs the requests in the console. set to false to turn off.
(error handler): manages the general error messages. Throws 500 errors for uncaught errors.
(limiter): basic limiter from koa-better-ratelimit
(auth): session handler. 
(public router): Apis that can accessed without a session.
(authenticated): checks if the provided cookie is contains a open session.
(router): Apis that require an authenticated session.

Plans: 

1. Organize Api, and stream line Api creation.
2. Flush out Migration futher.
3. Add LDAP, Google, Facebook authentication with passport.
4. expand and stream line testing.
5. Organize the sessions to add api restrictions per user.
6. Continue to explore the organzational theory being approached here.
	- All dependencies declared in the index.js. Dependencies are not declared in the lib files.
	- All middleware components refrenced in the /lib/nodes/nodes.js file. Each takes at least an "app" depedency from the koa app.

Tests:

npm run test-seed (runs the mocha test suite but runs the seeder to reset the database before the test).
