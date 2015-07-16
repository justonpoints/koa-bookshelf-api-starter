# koa-bookshelf-api
Koa with Bookshelf and Passport starter files

install : node, postrges(create a database)

1. git clone https://github.com/justonpoints/koa-bookshelf-api-starter.git
2. npm install (in the root of the app)
3. In Postgres, create a db to connect to.
3. Add Postgres creds to knexfile.js. (Use the development enviroment to start)
4. Run the migration to create the desired tables, and seed them. (npm run migration-seed)
5. Start the app. (npm run app)
6. Run the test. (npm run test) 
If all green, then you are good. 

Sample:

	- Login : http://localhost:1337/api/login  
	- Logout : http://localhost:1337/api/logout
	- Logged in?: http://localhost:1337/api/loggedin 
	- Create User: http://localhost:1337/api/user (Post) {name:string,password:string[min:5]}
	- Select User by id: http://localhost:1337/api/user/{id} (GET)
	- Update User: http://localhost:1337/api/user/{id} (PUT) {name or password} --plan move update password elsewhere.
	- DELETE User: http://localhost:1337/api/user/{id} (DELETE)

Quick reference to add an api in this enviroment.

1. Create migration file. (add seed data if desired)
2. Create a book in the /lib/books directory, add the book to the bookshelf in /lib/booksbookshelf.js (see bookshelf.js)
3. Create pages for the book in /lib/pages, add the pages to the desired book in /lib/books/books.js.
4. Create an Api that reads the pages in /lib/api. -this section needs to be organized better.
5. In /lib/routes, add routes to the api location.

Current flow:

- (logger): logs the requests in the console. set to false to turn off.
- (error handler): manages the general error messages. Throws 500 errors for uncaught errors.
- (limiter): basic limiter from koa-better-ratelimit
- (auth): session handler. 
- (public router): Apis that can accessed without a session.
- (authenticated): checks if the provided cookie is contains a open session.
- (router): Apis that require an authenticated session.

Plans: 

1. Organize Api, and stream line Api creation.
2. Flush out Migration futher.
3. Add LDAP, Google, Facebook authentication with passport.
4. expand and stream line testing.
5. Organize the sessions to add api restrictions per user.
6. Add https support.
7. Continue to explore the organzational theory being approached here.
	- All dependencies declared in the index.js. Dependencies are not declared in the lib files.
	- All middleware components refrenced in the /lib/nodes/nodes.js file. Each takes at least an "app" depedency from the koa app.

Tests:

- npm run test-seed (the data is reseeded with the test data, and then runs the mocha test) [use if you want to run a clean test].
- npm run test (runs just the mocha test suite)
