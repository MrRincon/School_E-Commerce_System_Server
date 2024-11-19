// Import the necessary modules
const express = require('express');
const bodyParser = require('body-parser');
// Import collections from mongoDB server
const { productsCollection, ordersCollection } = require('../mongoServer.js');
let generatedID = [];
const accessGetPost = express();
accessGetPost.set('json spaces', 3);

// Function to generate an Id for the new orders placed
function generateID(){ 
    while (true) {// Check the global array for the random number
        let randomId = "2" + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        if (!generatedID.includes(randomId)) {// If it doesn't exist, add it to the global array and return for future use
            generatedID.push(randomId);
            return randomId;
        }
    }
}

// GET for all the lessons
accessGetPost.get(`/lessons`, async (req, res) => {
    try {// Try catch for any errors when trying to fetch the lessons
        const lessons = await productsCollection.find({}).toArray();// Find all the lessons from the collection
        res.json(lessons);// Send the lessons as a json format
    } catch (error) {
        res.status(500).json({success: false, message: `Error with internal server: ${error}`});
    }
});

// Get for all the orders
accessGetPost.get(`/orders`, async(req, res) => {
    try {// Try catch for any errors when trying to fetch the orders
        const orders = await ordersCollection.find({}).toArray();// Find all the orders from the collection
        res.json(orders);// Send the orders as a json format
    } catch (error) {
        res.status(500).json({success: false, message: `Error with internal server: ${error}`});
    }
})

module.exports = accessGetPost;// Export all the functions