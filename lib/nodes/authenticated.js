module.exports = function(app){
  app.use(
    function *(next){
      app = this;
      if (app.req.isAuthenticated()){
        yield next;
      } else { 
        this.body = {error:{code:1}};
      }
    }
  );
}//Check if the session is valid, if not throw a 400 error.
