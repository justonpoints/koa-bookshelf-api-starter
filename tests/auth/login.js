module.exports = function(assert,request, cookieJar){
	describe('Test Login', function() {

		beforeEach(function() {
        	//reset cookie per login test
        	var cookieJar = {};
      	});
		  
		  it('Empty login should be rejected', function (done) {     
		      request.post({url:'http://localhost:1337/api/login', jar: cookieJar}, function (err, res, body){     
		        assert.equal('{"error":{"code":2,"message":"Bad Credentials"}}', res.body);
		        assert.equal(401, res.statusCode);

		        request.get({url:'http://localhost:1337/api/loggedin', jar: cookieJar}, function (err, res, body){     
		        	assert.equal('{"error":{"code":1,"message":"No Active Session"}}', res.body);
		        	assert.equal(401, res.statusCode);
		        	done();
		      	});//checker request\

		      });//main request
		  });//test function

		  it('Bad user name should be rejected', function (done) {
		      request.post({url:'http://localhost:1337/api/login?username=bob&password=password', jar: cookieJar}, function (err, res, body){     
		        assert.equal('{"error":{"code":2,"message":"Bad Credentials"}}', res.body);
		        assert.equal(401, res.statusCode);

		        request.get({url:'http://localhost:1337/api/loggedin', jar: cookieJar}, function (err, res, body){     
		        	assert.equal('{"error":{"code":1,"message":"No Active Session"}}', res.body);
		        	done();
		      	});//checker request

		      });//main request
		  });//test function

		  it('Bad password name should be rejected', function (done) {
		      request.post({url:'http://localhost:1337/api/login?username=one&password=password123', jar: cookieJar}, function (err, res, body){     
		        assert.equal('{"error":{"code":2,"message":"Bad Credentials"}}', res.body);
		        assert.equal(401, res.statusCode);

		        request.get({url:'http://localhost:1337/api/loggedin', jar: cookieJar}, function (err, res, body){     
		        	assert.equal('{"error":{"code":1,"message":"No Active Session"}}', res.body);
		        	done();
		      	});

		      });
		  });

		  it('It should log in', function (done) {
		      request.post({url:'http://localhost:1337/api/login', json:{username:"one",password:"password"}, jar: cookieJar}, function (err, res, body){     
		        var data = JSON.stringify(res.body);
		        assert.equal('{"success":true}', data);
		        assert.equal(200, res.statusCode);

		        request.get({url:'http://localhost:1337/api/loggedin', jar: cookieJar}, function (err, res, body){     
		        	assert.equal('{"success":"You are logged in"}', res.body);
		        	done();
		      	});

		      });
		   });

		   it('It should log out', function (done) {
		      var logout = request.post({url:'http://localhost:1337/api/logout', jar: cookieJar}, function (err, res, body){     
		        assert.equal('{"success":"Logged Out"}', res.body);
		        assert.equal(200, res.statusCode);
		        
		        request.get({url:'http://localhost:1337/api/loggedin', jar: cookieJar}, function (err, res, body){     
			        assert.equal('{"error":{"code":1,"message":"No Active Session"}}', res.body);
			        done();
		      	});

		      });		     
		   });


		});
}