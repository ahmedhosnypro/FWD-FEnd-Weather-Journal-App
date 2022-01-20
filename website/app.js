// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&appid=8553a2bea1cdd4c0a872125b795bd7de&mode=json&units=metric';

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
async function performAction() {
    const zipCode = document.getElementById('zip').value;
    if (document.getElementById('zip').value.length === 0) {
        alert("You must enter a zip code");
    } else {
        const feelings = document.getElementById('feelings').value;
        getWeather(baseURL, zipCode, apiKey)
            .then(await function (data) {
                // Add data
                console.log('posting data', data);
                postWeather('/addWeather', {
                    temp: data.main.temp, date: newDate, userResponse: feelings, cityName: data.name
                });
            })
            .then(function () {
                updateUI();
            });
    }
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zipCode, key) => {

    const res = await fetch(baseURL + zipCode + key)
    try {
        const data = await res.json();
        console.log('getting weather', data)
        return data;
    } catch (error) {
        console.log("error", error);
    }
}
/* Function to POST data */
const postWeather = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST', credentials: 'same-origin', headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
        return await response.json();
    } catch (error) {
        console.log("error", error);
    }
};


// Function to update UI elements
const updateUI = async () => {
    const request = await fetch('/getWeather');
    try {
        const allData = await request.json();
        console.log('getting', allData);
        document.getElementById('city').innerHTML = 'City: ' + allData.cityName;
        document.getElementById('date').innerHTML = 'Date: ' + allData.date;
        document.getElementById('temp').innerHTML = 'temperature: ' + allData.temp + '°C';
        document.getElementById('content').innerHTML = 'Response: ' + allData.userResponse;

    } catch (error) {
        console.log("error", error);
    }
}