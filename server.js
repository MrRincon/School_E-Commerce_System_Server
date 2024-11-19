// Import the necessary modules
const express = require('express');// Main server framework
// Define port which the server will listen
const port = 3000;
// Initialises an express app, which is the main object used to set up middlewares, routes, and start the server
const app = express();

// Starting the server on the defined port (3000)
app.listen(port, '0.0.0.0', ()=>{
    console.log(`App started on port http://localhost:${port}`);
});