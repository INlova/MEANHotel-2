var express = require('express');
var app = express(); //initial express to create the application
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./api/routes');

app.set('port', 3000);

app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});//the order of middleware is important - they run sequentially
//for middleware to only put out to the console any requests where the path start with /css - only references the css files
// app.use('/css', function(req, res, next){
//     console.log(req.method, req.url);
//     next();
// });


app.use(express.static(path.join(__dirname, 'public')));//when express recvs request for a root, it will chk if that root is matched by any files in public folder - if match found, it will deliver that file directly to the browser w/o adding in extra routes

//app.use('/public', express.static(path.join(__dirname, 'public'))); - optional for subset of routes
//.use indicates we are using middleware

// app.get('/', function(req, res){//this route is outdated now that line 7 was added
//   console.log("GET the homepage");
//   res
//     .status(200)
//     .sendFile(path.join(__dirname, 'public', 'index.html'));//passing in filenames as strings avoids potential syntax issues w/ other directory structures on other operating systems
// });
//the function in the route takes 2 parameters:
//request (req) object: contains data about the incoming request
//response (res) object: contains data & methods relating to a response

app.use(bodyParser.urlencoded({ extended : false}));

app.use('/api', routes); //the '/' (alone) means that express will look inside the routes file for any route - can be changed to look api & express will only use routes with paths that start with api 
//test the get request in browswer by entering: localhost:3000/api/json
//to test post requests use postman

//INSTEAD of below, for video 12, we will create controllers to power the logic behind the routes
// app.get('/json', function(req, res){
//     console.log("GET the json");
//     res
//       .status(200)
//       .json({"jsonData" : true});
//   });

// app.get('/file', function(req, res){
//     console.log("GET the file");
//     res
//       .status(200)
//       .sendFile(path.join(__dirname, 'app.js')); //.join allows multiple parameters to create a file path
// });

var server = app.listen(app.get('port'), function(){
 var port = server.address().port;
 console.log('Magic happens on port ' + port);    
});

//Recap for Vid13 - we learned how the URL parameters are used to take info from a specified path in the URL that is defined in the routes; and then we can use that info in the controller - this is normally used to query data

//below is part of earlier videos

//console.log('Me first!'); //validates that app.listen is asynchronous

//recap of above - we've learned how to:
// Bring express into our app
// Instantiate an express application
// How to set a port# and read #s using application variables
// How to listen for requests on that particular port

// Also learned that app.listen is asynchronous

//The idea of routing: 
//Listening for requests on specific URLs
//Doing something on the server
//Sending a response















//from original app.js file, for everything before vid 7 below
// console.log("It works!");

// require('./instantHello'); //to look for instantHello in same folder, prefix with ./
// var goodbye = require('./talk/goodbye');
// var talk = require('./talk'); // when u have an index.js file in ur folder, u only need to specify folder name to locate the index.js file
// var question = require('./talk/question');

// talk.intro();
// talk.hello("Simon");

// var answer = question.ask("What is the meaning of life?");
// console.log(answer);

// goodbye();