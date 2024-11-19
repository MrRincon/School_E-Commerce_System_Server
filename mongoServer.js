// Import classes from mongoDB
const path = require('path');
const propertiesReader = require('properties-reader'); 
const propertiesPath = path.resolve(__dirname, './conf/db.properties');
const properties = propertiesReader(propertiesPath);
const {MongoClient, ServerApiVersion} = require('mongodb');

// Create connection URI with encoded root and password
let dbPprefix = properties.get('db.prefix');
let dbUsername = encodeURIComponent(properties.get('db.user'));
let dbPwd = encodeURIComponent(properties.get('db.pwd'));
let dbName = properties.get('db.dbName');
let dbUrl = properties.get('db.dbUrl');
let dbParams = properties.get('db.params');
const uri = dbPprefix + dbUsername + ':' + dbPwd + dbUrl + dbParams;

// Set up client
const client = new MongoClient(uri, {serverApi: ServerApiVersion.v1});
// The database that will be used within mongoDB
const db = client.db(dbName);

// The collections that will be used
const productsCollection = db.collection("Products");
const ordersCollection = db.collection("Orders");

// Exporting the collections 
module.exports = { productsCollection, ordersCollection };