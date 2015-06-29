module.exports = function(Bookshelf){
  //db connection
  var methods={};

  //example model
  var Pets = Bookshelf.Model.extend({ tableName: 'pet' });

  //creates a new entry in the table specfied in Model.extend.
  // forge is present to force a new model object for Bookshelf
  // Takes a json object : {item:value, item2:value2}
  methods.create = function *(data){
    var query = yield Pets.forge(data).save();
    return query;
  };
  
  // Updates an entry in the table above.
  // Makes a query to check if the entry exist, and then updates the entry if it does not. 
  // Null is returned if the entry dne. This is handeled in error.js
  // Takes a json object : {match:{item to locate entry}, {data to be updated}}, e.g. {match:{id:3}, update:{item:value}}
  methods.update = function *(data){
    console.log(data);
    var query = yield methods.selectById(data.match);
    if (query !== null){
      query = yield query.save(data.update);
    }
    return query;
  };

  //SReturns the record based on the provided id from the above table.
  methods.selectById = function *(id){
      console.log(id);
      var query = yield Pets.where({id:id}).fetch();
      return query;
  };

  //Deletes the entry from the above table with the provided id.
  methods.delete = function *(id){
      console.log(id);
      var query = yield methods.selectById(id);
      if (query !== null){
        query = yield query.destroy();
      }
      return query;
  };

  return methods;
}//end exports