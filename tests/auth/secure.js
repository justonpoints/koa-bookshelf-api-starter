module.exports = function(assert,request){
   describe('No active session', function(){
      
      it('Get User Secured? /user/:id', function (done) {
        request.get({url:'http://localhost:1337/api/user/1'}, function (err, res, body){
          assert.equal('{"error":{"code":1,"message":"No Active Session"}}',res.body);
          assert.equal(res.statusCode, 401);
          done();
        });
      });

      it('Put User Secured? /user/:id [post data]', function (done) {
        request.put({url:'http://localhost:1337/api/user/1', json:{name:"charley"}}, function (err, res, body){
          var data = JSON.stringify(res.body);
          assert.equal('{"error":{"code":1,"message":"No Active Session"}}',data);
          assert.equal(res.statusCode, 401);
          done();
        });
      });

      it('Post User Secured? /user [post data]', function (done) {
        request.post({url:'http://localhost:1337/api/user', json:{name:"charley",password:"monkey"}}, function (err, res, body){
          var data = JSON.stringify(res.body);
          assert.equal('{"error":{"code":1,"message":"No Active Session"}}',data);
          assert.equal(res.statusCode, 401);
          done();
        });
      });

      it('Delete User Secured? /user/:id', function (done) {
        request.del({url:'http://localhost:1337/api/user/1'}, function (err, res, body){
          assert.equal('{"error":{"code":1,"message":"No Active Session"}}',res.body);
          assert.equal(res.statusCode, 401);
          done();
        });
      });

      it('Is Log in checker secure', function (done) {
        request.del({url:'http://localhost:1337/api/loggedin'}, function (err, res, body){
          assert.equal('{"error":{"code":1,"message":"No Active Session"}}',res.body);
          assert.equal(res.statusCode, 401);
          done();
        });
      });

      it('Is get MyUser secure?', function (done) {
        request.get({url:'http://localhost:1337/api/user/me'}, function (err, res, body){
          assert.equal('{"error":{"code":1,"message":"No Active Session"}}',res.body);
          assert.equal(res.statusCode, 401);
          done();
        });
      });

    });
}