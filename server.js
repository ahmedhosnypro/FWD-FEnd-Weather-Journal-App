// Setup empty JS Object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross-origin allowance
const cors = require('cors');
require("express/lib/request");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);
// Callback to debug
function listening() {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

// GET Weather
app.get('/getWeather', sendData);
function sendData(req, res) {
    res.send(projectData);
}

// POST a weather
app.post('/addWeather', addWeather);
function addWeather(req, res) {
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
    projectData.cityName = req.body.cityName;
    res.send(projectData);
    console.log('posting', projectData);
}


