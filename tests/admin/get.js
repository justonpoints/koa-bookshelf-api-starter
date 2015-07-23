module.exports = function(assert,request,cookieJar){
    describe('Get User - /user/:id GET', function(){
        
      it('Get user by Id /api/usr/:id', function (done) {
        request.get({url:'http://localhost:1337/api/user/1', jar: cookieJar}, function (err, res, body){
          assert.equal('{"id":1,"name":"one"}', res.body);
          assert.equal(200, res.statusCode);
          done();
        });
      });

      it('Get another user by Id /api/usr/:id', function (done) {
        request.get({url:'http://localhost:1337/api/user/2', jar: cookieJar}, function (err, res, body){
          assert.equal('{"id":2,"name":"two"}', res.body);
          assert.equal(200, res.statusCode);
          done();
        });
      });

      it('Error when id does not exist? /api/usr/:id', function (done) {
        request.get({url:'http://localhost:1337/api/user/2000', jar: cookieJar}, function (err, res, body){
          assert.equal('{"error":{"code":3,"message":"Record Not Found"}}', res.body);
          assert.equal(404, res.statusCode);
          done();
        });
      });

       it('Get user with junk parameter /api/usr/:id?bugger=bugbug', function (done) {
        request.get({url:'http://localhost:1337/api/user/1?bugger=bugbug', jar: cookieJar}, function (err, res, body){
          assert.equal('{"id":1,"name":"one"}', res.body);
          assert.equal(200, res.statusCode);
          done();
        });
      });

      it('Get user by Name /api/usr/:name', function (done) {
        request.get({url:'http://localhost:1337/api/user/one', jar: cookieJar}, function (err, res, body){
          assert.equal('{"id":1,"name":"one"}', res.body);
          assert.equal(200, res.statusCode);
          done();
        });
      });

      it('Get another user by name /api/usr/:name', function (done) {
        request.get({url:'http://localhost:1337/api/user/two', jar: cookieJar}, function (err, res, body){
          assert.equal('{"id":2,"name":"two"}', res.body);
          assert.equal(200, res.statusCode);
          done();
        });
      });

      it('Error when Name does not exist? /api/usr/:name', function (done) {
        request.get({url:'http://localhost:1337/api/user/casper', jar: cookieJar}, function (err, res, body){
          assert.equal('{"error":{"code":3,"message":"Record Not Found"}}', res.body);
          assert.equal(404, res.statusCode);
          done();
        });
      });

      it('Get My User /api/user/me', function (done) {
        request.get({url:'http://localhost:1337/api/user/me', jar: cookieJar}, function (err, res, body){
          assert.equal('{"id":1,"name":"one"}', res.body);
          assert.equal(200, res.statusCode);
          done();
        });
      });

  });
}