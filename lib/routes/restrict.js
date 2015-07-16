module.exports = function(){
  var restrict = {};
 
  restrict.admin = function *(next) {
     if (this.session.passport.user.type < 10){
        this.status = 400;
        this.body = {error:'restricted'};
     }
     else{
      yield next;
     }
  }

  return restrict;
}//end exports