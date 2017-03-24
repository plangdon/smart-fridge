"use strict";

module.exports = function(config) {

	global.logger = require("./logger")(config.logger);
	global.brandingName = 'BLT'
	global.tsServer = config.tsServer;
	global.appServer = config.appServer;

	const
		path = require("path"),
		http = require("http"),
		express = require("express"),
		bodyParser = require("body-parser"),
		//mongo = require("./data/mongo-client")(config);
		mysql2 = require("./data/mysql-client")(config);


		var session  = require('express-session');
		var cookieParser = require('cookie-parser');
		var bcrypt = require('bcrypt-nodejs');
		var morgan = require('morgan');
		//var port     = process.env.PORT || 3001;
		var expressValidator = require('express-validator');
		var passport = require('passport');
		var flash    = require('connect-flash');

	require('./passport')(passport,config); // pass passport for configuration

	let app = express();


	// set up our express application
	//app.use(morgan('tiny')); // log every request to the console
	app.use(cookieParser()); // read cookies (needed for auth)
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
	app.use(bodyParser.json());
	app.use(expressValidator());

	/*Set EJS template Engine*/
	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(session({
		secret: 'bltholdthemayo',
		resave: true,
		saveUninitialized: true
	 } )); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

/*
	app.set('views', path.join(__dirname, "views"));
	//app.set('view engine', 'jade');

	app.use("/api", bodyParser.json());
	app.use("/api", require("./routers/policy")(mongo))

	app.use("/css", express.static(config.webServer.cssFolder));
	app.use("/js", express.static(config.webServer.jsFolder));
	app.use("/libs", express.static(config.webServer.libsFolder));

	app.get("/", function(req, res) {
		res.render("index", {
			config: {
				isProd: config.mode === "production"
			}
		});
	});

*/

/*MySql connection*/
var connection  = require('express-myconnection'),
    mysql = require('mysql');

app.use(
    connection(mysql,{
        //host     : '10.10.10.1', // 'localhost'
        host     : 'localhost',
        user     : 'thing',
        password : 'speak',
        database : 'thingspeak_development',
				connectTimeout :  30000,
        debug    : false //set true if you wanna see debug logger
    },'request')
);

require('./cron.js')('13556046',app, mysql2,config); // load our routes and pass in our app and fully configured passport
require('./routes.js')(app, passport, express, mysql2,config); // load our routes and pass in our app and fully configured passport


// launch ======================================================================
//app.listen(port);

	http.createServer(app)
		.listen(config.webServer.port, function() {
			logger.info(`web server start on port: ${config.webServer.port}`);
		});

};
