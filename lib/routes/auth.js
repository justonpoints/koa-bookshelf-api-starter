module.exports = function(passport,local,dbAuth){

//update this to query the database and get the user credentials, look into using the google and facebook modules.
passport.use(new local(function(username, password, done) { 
  var validate = dbAuth.validatePass({name:username,password:password});
  validate.then(function(user){
    if (user.message === "Bad Credentials"){
      done(null, false, user);
    }
    else if (username === user.name && password === user.password)
    {
      done(null, {id:user.id, user: username, type:user.type});
    }
    else
    {
      done(null, false);
    }
  });

}));

passport.serializeUser(function(user, done) { 
  done(null, user);
});

passport.deserializeUser(function(user, done) { 
  done(null, user);
});

return passport;
}