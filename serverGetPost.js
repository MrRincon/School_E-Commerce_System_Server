// Import the necessary modules
const express = require('express');
const bodyParser = require('body-parser');
// Import collections from mongoDB server
const { productsCollection, ordersCollection } = require('./mongoServer.js');
const accessGetPost = express();
accessGetPost.use(bodyParser.json());
accessGetPost.set('json spaces', 3);

// Function to generate a random Id for the new orders placed
function generateRandomID() {
    let randomId = "2" + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return randomId;// Return the random id
};

// Async function to make sure that the id generated is unique
async function generateUniqueID() {
    let uniqueID;
    let isNotUnique = true;
    while (isNotUnique) {// Generates a new random id for the order until the id is not found in the orders collection
        uniqueID = generateRandomID();// Call the function that generates the random id
        const existingOrder = await ordersCollection.findOne({ id: uniqueID });
        if (!existingOrder) {// Break the loop when the id is unique
            isNotUnique = false;
        }
    }
    return uniqueID;// Returns the unique generated id 
}

// GET to welcome to the server
accessGetPost.get(`/`, (req, res) => {
    res.send("Welcome to SchoolFlex")
})

// GET for all the lessons
accessGetPost.get(`/lessons`, async (req, res) => {
    try {// Try catch for any errors when trying to fetch the lessons
        const lessons = await productsCollection.find({}).toArray();// Find all the lessons from the collection
        res.json(lessons);// Send the lessons as a json format
    } catch (error) {
        res.status(500).json({ success: false, message: `Error getting the lessons with internal server: ${error}` });
    }
});

// GET for all the orders
accessGetPost.get(`/orders`, async (req, res) => {
    try {// Try catch for any errors when trying to fetch the orders
        const orders = await ordersCollection.find({}).toArray();// Find all the orders from the collection
        res.json(orders);// Send the orders as a json format
        // await client.close();
    } catch (error) {
        res.status(500).json({ success: false, message: `Error getting the orders with internal server: ${error}` });
    }
})

// POST for searched lessons
accessGetPost.post('/search', async (req, res) => {
    try {
        const searchQ = req.body;
        console.log(searchQ);
        const query = {
            $or: [
                { subject: { $regex: new RegExp(searchQ.searchTerm, 'i') } },
                { location: { $regex: new RegExp(searchQ.searchTerm, 'i') } },
                { price: { $lte: Number(searchQ.searchTerm) } }
            ]
        };
        const results = await productsCollection.find(query).toArray();
        res.json(results);
    } catch (error) {
        res.status(500).json({ err: 'Internal server error when searching' });
    }
})

//POST for new orders
accessGetPost.post(`/placeOrder`, async (req, res) => {
    try {// Try catch for any errors of the req.body
        const data = req.body;
        data.id = await generateUniqueID();// Assigned the id to the order data in the body of the request, once generated and confirmed
        await ordersCollection.insertOne(data);// Insert the order data in the orders collection
        res.json({ success: true, order: data });// Send a response with the orders data back
    } catch (error) {
        res.status(500).json({ success: false, message: `Error placing the order with internal server: ${error}` });
    }
})

//PUT for updating the lessons
accessGetPost.put(`/updateLessons`, async (req, res) => {
    try {// Try catch for any errors of the req.body
        const data = req.body;
        console.log(data.purchasedLessonsID);
        for (let lessonID of data.purchasedLessonsID) {// Looping through all the elements in the data inside the request
            const filter = { id: lessonID };
            const update = { $inc: { available: -1 } };
            await productsCollection.updateOne(filter, update);// For each element found with specific id, update the vailable value
        }
        res.json({ success: true, message: "Lessons updated successfully." });// Return a successful response
    } catch (error) {
        res.status(500).json({ success: false, message: `Error updating the lessons with internal server: ${error}` });
    }
})

module.exports = accessGetPost;// Export all the functions