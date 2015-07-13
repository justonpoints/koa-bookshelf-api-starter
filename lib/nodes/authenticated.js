module.exports = function(app){
  app.use(
    function *(next){
      app = this;
      if (app.req.isAuthenticated()){
        yield next;
      } else {
        this.status = 400;//update this to an api
        this.body = {"error":"no active session"}
      }
    }
  );
}//Check if the session is valid, if not throw a 400 error.
