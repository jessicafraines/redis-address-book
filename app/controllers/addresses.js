'use strict';
var Address = require('../models/address');

exports.index = function(req, res){
  console.log(res.locals);
  Address.findAllByUserId(res.locals.user._id, function(err, addresses){
    res.render('addresses/index', {addresses:addresses});
  });
};

exports.new = function(req, res){
  res.render('addresses/new');
};
exports.create = function(req, res){
  Address.create(req.body, res.locals.user._id, function(){
    res.redirect('/addresses');
  });
};

exports.destroy = function(req, res){
  Address.destroy(req.params.id, function(){
    res.redirect('/addresses');
  });
};
