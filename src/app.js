'use strict';

var express = require('express');
var app = express();
var models = require('../models')

// Adding tabs to our app. This will setup routes to various views
var tabs = require('./tabs');
tabs.setup(app);

// Adding a bot to our app
var bot = require('./bot');
bot.setup(app);

var debug = require('./debug')
debug.setup(app);

// Adding a messaging extension to our app
var messagingExtension = require('./messaging-extension');
messagingExtension.setup();

// database integration
models.sequelize.sync({ /*force: true*/ }).then(function () {
    // Start our nodejs app
    var port = process.env.PORT || 3333;
    app.listen(port, function () {
        console.log('App started listening on port ' + port + ' at ' + new Date());
    });
});