module.exports = function(assert,request,cookieJar){
    describe('Get User - /user/:id GET', function(){
        
      it('Get user', function (done) {
        request.get({url:'http://localhost:1337/api/test/1', jar: cookieJar}, function (err, res, body){
          var test = JSON.parse(res.body);
          assert.equal('{"id":1,"name":"one"}', res.body);
          done();
        });
      });

       it('Get user with junk parameter', function (done) {
        request.get({url:'http://localhost:1337/api/test/1', jar: cookieJar, json:{bugger:"bugbug"}}, function (err, res, body){
          //var test = JSON.parse(res.body);
          var data = JSON.stringify(res.body);
          assert.equal('{"id":1,"name":"one"}', data);
          done();
        });
      });

  });
}