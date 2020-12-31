import axios from 'axios';

//To be placed securely either in env or storage
const apiKey = '183f13cca48064cc65348cfae1052620';

function makeApiCall(type, url, data) {
    switch(type) {
        case 'GET': 
            return axios.get(url, {
                headers: {
                    //if any
                },
                params: {...data}
            });
        case 'POST': 
            return axios.post(url, {...data}, {
                headers: {
                    //if any
                }
            })
    }
}

export function getCurrentWeather(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    return makeApiCall('GET', url, {});
}

export function getHourlyForecast(city) {
    let url = `https://api.weatherapi.com/v1/forecast.json?key=86c87f3f53bf4c82b9580745203112&q=${city}&days=7`;
    return makeApiCall('GET', url, {});
}