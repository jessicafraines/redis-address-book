'use strict';
var User = require('../models/user');

exports.new = function(req, res){
  res.render('user/new');
};

exports.create = function(req, res){
  User.register(req.body, function(err, user){
    if(user){ //if there was no user redirect to /register
      res.redirect('/');
    }else{
      res.redirect('/register');
    }
  });
};

exports.login = function(req, res){
  console.log('looking into res.locals');
  console.log(res.locals);
  res.render('user/login');
};

exports.authenticate = function(req, res){
  User.authenticate(req.body, function(user){
    if(user){
      req.session.regenerate(function(){ //this makes it more safe
        req.session.userId = user._id;
        req.session.save(function(){
          res.redirect('/');
        });
      });
    }else{
      res.redirect('/login');
    }
  });
};

exports.logout = function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
};

