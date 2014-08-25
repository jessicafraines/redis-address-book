'use strict';

var Mongo = require('mongodb');

function Address(o, id){
  this.name     = o.name;
  this.color    = o.color;
  this.twitter  = o.twitter;
  this.facebook = o.facebook;
  this.address  = o.address;
  this.userId   = id;
  this.photo    = [];
}

Object.defineProperty(Address, 'collection', {
  get: function(){return global.mongodb.collection('addresses');}
});

Address.create = function(obj, id, cb){
  var a = new Address(obj, id);
  Address.collection.save(a, cb);
};

Address.findAllByUserId = function(userId, cb){
  Address.collection.find({userId:userId}).toArray(cb);
};

Address.destroy = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Address.collection.remove({_id:_id}, cb);
};
module.exports = Address;

