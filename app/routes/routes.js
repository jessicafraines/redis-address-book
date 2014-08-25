'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    less           = require('less-middleware'),
    home           = require('../controllers/home'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),// pass session into redis to link cookies to redis
    security       = require('../lib/security'),
    users          = require('../controllers/users'),
    addresses      = require('../controllers/addresses');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(less(__dirname + '/../static'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());
  app.use(session({store:new RedisStore(),
    secret:'keyboard cat',
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge:null} //this says cookie is good for 1 day (for 1 hour would be 3600 seconds)
  }));

  app.use(security.authenticate);

  app.get('/', home.index);
  app.get('/register', users.new);
  app.post('/register', users.create);
  app.get('/login', users.login);
  app.post('/login', users.authenticate);

  app.use(security.bounce);

  app.delete('/logout', users.logout);
  app.get('/addresses', addresses.index);
  app.post('/addresses', addresses.create);
  app.get('/addresses/new', addresses.new);
  app.post('/addresses/:id/delete', addresses.destroy);


  console.log('Express: Routes Loaded');
};

