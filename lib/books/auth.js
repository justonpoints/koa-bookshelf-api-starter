//module for authentication connections.
module.exports = function(bookshelf, checkit){
	return bookshelf.Model.extend({ 
		tableName: 'user',
		initialize: function () {
            //this.on('fetching', this.validateFetch);
        },
        validateFetch: function () {
        	rules =  {
        		name:{
        			rule:"required",
        			message:"name required in auth"
        		},
        		password:{
        			rule:"required",
        			messasge:"password required"
        		}
  			}
            return new checkit(rules).run(this.attributes);
        }
	});
}