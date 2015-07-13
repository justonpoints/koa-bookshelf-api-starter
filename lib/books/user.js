module.exports = function(bookshelf, checkit){
	return bookshelf.Model.extend({ 
		tableName: 'user',
		initialize: function () {
            this.on('saving', this.validateSave);
        },
        validateSave: function () {
        	rules =  {
        		id:{
        			rule:"required",
        			message:"id required"
        		},
        		name:{
        			rule:"required",
        			message:"name required"
        		},
        		password:{
        			rule:"minLength:5",
        			messasge:"length must be greater than 5"
        		}
  			}
            return new checkit(rules).run(this.attributes);
        }
	});
}