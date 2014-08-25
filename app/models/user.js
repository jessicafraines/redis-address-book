'use strict';
var bcrypt = require('bcrypt'),
    Mongo  = require('mongodb');

function User(){
}

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

User.register = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){ //find one based on email
    if(user){return cb();} //if you find user, cb with empty callback

    o.password = bcrypt.hashSync(o.password, 10);//generates the password with random numbers

    User.collection.save(o, cb);//mongo cb goes to controller & calls that function
  });
};

User.authenticate = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){ //find one based on email
    if(!user){return cb();} //if email is bad, get out! return empty callback
    var isOk = bcrypt.compareSync(o.password, user.password); //compares plain password enterd, and encrypted password
    if(!isOk){return cb();} //if password is bad, i'm calling you back with nothing

    cb(user); //else if everything is good, call back with the object
  });
};

User.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  User.collection.findOne({_id:_id}, cb);
};

User.all = function(cb){
  User.collection.find().toArray(cb);
};

module.exports = User;

