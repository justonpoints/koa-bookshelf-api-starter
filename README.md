# koa-bookshelf-api
Koa Bookshelf passport starter files

install : node, postrges(create a database)

1. git clone https://github.com/justonpoints/koa-bookshelf-api-starter.git
2. npm install (in the root of the app)
3. Add Postgres creds to index.js knex connection
4. Update table name in lib/api/api.js
5. node --harmony index.js (in the root of the app, --harmony required since we are using generators)

5. Login to the app
http://localhost:1337/api/login?username=foo&password=bar 

6. Make a sample query
	- Create : http://localhost:1337/api/test/ (Post)
	- SelectById : http://localhost:1337/api/test/{id} (GET)
	- Update : http://localhost:1337/api/test/{id} Postdata:[data to update](PUT)
	- DELETE : http://localhost:1337/api/test/{id} (DELETE)


Plans: 

1. To flush this out further.
2. Add Migration.
3. Update the Authentication.
4. Add testing for the api.
5. Continue to explore the organzational theory being approached here.
	- All dependencies declared in the index.js. Dependencies are not declared in the lib files.
	- All middleware components refrenced in the /lib/lib.js file. Each instaces takes at least an "app" depedency for the koa app.
