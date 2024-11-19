// Import the necessary modules
const express = require('express');
const cors = require('cors');
// Defining the array of IP addresses that are allowed to access the API
const ALLOWED_IPS = ['127.0.0.1', '123.456.7.89'];
// Creating a new router instance from express to handle API routes and middleware
const api = express.Router();
// Extra Middleware to check if the incoming request's IP address is allowed access
api.use(function(req,res,next) {
    // Checks if the request's IP is in the list of allowed IPs
    const userIsAllowed = ALLOWED_IPS.indexOf(req.ip) !== -1;
    if (!userIsAllowed){
        // Sends a 401 (Unauthorised) response if the IP is not allowed
        res.status(401).send('Not authorised!');
    } else {
        // Proceeds with the next step after this Middleware
        next();
    }
});
// Extra Middleware to allow Cross-Origin Resource Sharing
api.use(cors());
// Exports all the api functions
module.exports = api;