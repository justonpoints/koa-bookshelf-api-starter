module.exports = function(assert,request){
	describe('Test Login', function() {
  		var cookieJar = request.jar();
		  
		  beforeEach(function() {
		    //reset cookie per login test
		    var cookieJar = {};
		  });
		  
		  it('Empty login should be rejected', function (done) {     
		      request.get({url:'http://localhost:1337/api/login', jar: cookieJar}, function (err, res, body){     
		        assert.equal('{"success":false,"info":{"message":"Missing credentials"}}', res.body);
		        request.get({url:'http://localhost:1337/api/loggedin', jar: cookieJar}, function (err, res, body){     
		        	assert.equal('{"error":"no active session"}', res.body);
		        	done();
		      	});//checker request\

		      });//main request
		  });//test function

		  it('Bad user name should be rejected', function (done) {
		      request.get({url:'http://localhost:1337/api/login?username=bob&password=password', jar: cookieJar}, function (err, res, body){     
		        assert.equal('{"success":false,"info":{"message":"Bad Credentials"}}', res.body);

		        request.get({url:'http://localhost:1337/api/loggedin', jar: cookieJar}, function (err, res, body){     
		        	assert.equal('{"error":"no active session"}', res.body);
		        	done();
		      	});//checker request

		      });//main request
		  });//test function

		  it('Bad password name should be rejected', function (done) {
		      request.get({url:'http://localhost:1337/api/login?username=one&password=password123', jar: cookieJar}, function (err, res, body){     
		        assert.equal('{"success":false,"info":{"message":"Bad Credentials"}}', res.body);

		        request.get({url:'http://localhost:1337/api/loggedin', jar: cookieJar}, function (err, res, body){     
		        	assert.equal('{"error":"no active session"}', res.body);
		        	done();
		      	});

		      });
		  });

		  it('It should log in', function (done) {
		      request.get({url:'http://localhost:1337/api/login?username=one&password=password', jar: cookieJar}, function (err, res, body){     
		        assert.equal('{"success":true}', res.body);

		        request.get({url:'http://localhost:1337/api/loggedin', jar: cookieJar}, function (err, res, body){     
		        	assert.equal('{"success":"You are logged in"}', res.body);
		        	done();
		      	});

		      });
		   });

		   it('It should log out', function (done) {
		      var logout = request.get({url:'http://localhost:1337/api/logout', jar: cookieJar}, function (err, res, body){     
		        assert.equal('{"success":"Logged Out"}', res.body);
		        
		        request.get({url:'http://localhost:1337/api/loggedin', jar: cookieJar}, function (err, res, body){     
			        assert.equal('{"error":"no active session"}', res.body);
			        done();
		      	});

		      });		     
		   });


		});
}