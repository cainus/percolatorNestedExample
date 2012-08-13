var Resource = require('resorcery').resource;

// represent a single user resource!!


exports.handler = new Resource({

  fetch : function(req, cb){
    var user = this.app.users[this.uri.param('users')];
    if (!!user){
      cb(null, user); // null error, and returning the user object
    } else {
      cb(true); // true = there was an error
    }
  },

  GET : function(req, res){
    // TODO : put 'fetched' on 'this'
    var user = req.resource.fetched;
    // TODO I shouldn't have to append user.id to a
    // string for this to work
    user.id += '';
    user = { name : user.name,
             id : user.id,
             _links : {
                 // TODO this.uri.get() should return an absolute URL
                self :
                  {href : this.uri.absolute(this.uri.get('users*', {'users' : user.id}))},
                parent :
                  {href : this.uri.absolute(this.uri.get('users'))},
                followers :
                  {href : this.uri.absolute(this.uri.get('users*followers', {'users' : user.id}))}
              }
    };
    this.repr(user);
  }

});
