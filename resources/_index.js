var collection = require('resorcery').collection;
var resource = require('resorcery').resource;
var _ = require('underscore');

// the root resource at /

exports.handler = new resource({

  GET : function(req, res){
    var links = {};
    _.each(this.uri.links(), function(value, key){
      links[key] = { href : value };
    });
    this.repr({ _links : links});
  }


});

