// Import the necessary modules
const express = require('express');
const bodyParser = require('body-parser');
// Import collections from mongoDB server
const { productsCollection, ordersCollection } = require('../mongoServer.js');
// let generatedID = [];
// const studentID = 'M00774667';// StudentID as variable
const accessGetPost = express();
accessGetPost.set('json spaces', 3);
// GET for all lessons
accessGetPost.get(`/collections/lessons`, async (req, res) => {
    try {//Try catch for any errors when trying to fetch the users
        const lessons = await productsCollection.find({}).toArray();//Find all the lessons from the collection
        res.json(lessons);//Send the lessons as a json format
    } catch (error) {
        res.status(500).json({success: false, message: `Error with internal server: ${error}`});
    }
});
module.exports = accessGetPost;// Export all the functions