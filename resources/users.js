var _ = require('underscore');

// represent a collection of user resources

exports.handler = {
  GET : function(req, res){
    var that = this;
    var users = _.map(this.app.users, function(user){
      // TODO I shouldn't have to append user.id to a
      // string for this to work
      var selfLink = that.uri.get('users*', {'users' : '' + user.id});
      // TODO this.uri.get() should return an absolute URL
      selfLink = that.uri.absolute(selfLink);
      return { name : user.name,
               id : user.id,
               _links : { self : { href : selfLink} }
               };
    });
    var links = {};
    _.each(this.uri.links(), function(value, key){
      links[key] = { href : value };
    });
    this.repr({collection : users, _links : links});
  }

};
