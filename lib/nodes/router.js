module.exports = function(app,router,mount){
  app.use(mount('/api', router.middleware()));//mount all the routes to the app
}//Check if the session is valid, if not throw a 400 error.
