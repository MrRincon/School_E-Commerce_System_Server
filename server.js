// Import the necessary modules
const express = require('express');// Main server framework
const morgan = require('morgan');// Logger middleware to track incoming requests
const path = require('path');// To work with file and directory paths
const cors = require('cors');
const accessGetPost = require('./serverGetPost.js');

// Define port which the server will listen
const port = process.env.PORT || 3000;
console.log(port);
// Initialises an express app, which is the main object used to set up middlewares, routes, and start the server
const app = express();

// First Middleware to log all incoming requests
app.use(morgan('short'));// Using morgan to add a logger that outputs each request to the console

// Second Middleware to server static files
var publicPath = path.join(__dirname, '../School_E-Commerce_System_Site');// Locate the Site folder
var imagePath = path.join(__dirname, '../School_E-Commerce_System_Site/images');
app.use(express.static(publicPath));// Using the path with express.static so express can server the files from the folder
app.use(express.static(imagePath));

// Extra Middleware to allow Cross-Origin Resource Sharing
app.use(cors());

// Diverts all the requests to another router to manage all the GET and POST methods
app.use(accessGetPost);

// Third Middleware to handle 404 errors
app.use(function(req, res){
    //Sets the HTTP response status code to 404 ("Not Found")
    res.status(404).send(`${res.statusCode}: File not found!`);
});
// Starting the server on the defined port (3000)
app.listen(port, ()=>{
    console.log(`App started on port: ${port}`);
});