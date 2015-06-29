module.exports = function(passport,local){

//update this to query the database and get the user credentials, look into using the google and facebook modules.
passport.use(new local(function(username, password, done) { 
  if (username === 'foo' && password === 'bar')
  {
    done(null, { user: username });
  }
  else
  {
    done(null, false);
  }
}));

// Move this in the Bookshelf user module, when ready.
passport.serializeUser(function(user, done) { 
  done(null, user);
});

passport.deserializeUser(function(user, done) { 
  done(null, user);
});

return passport;
}