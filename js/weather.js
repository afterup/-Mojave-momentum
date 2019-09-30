const weather = document.querySelector(".js-weather");

const COORDS = 'coords';
const API_KEY = '689fbec4fea8ac272fba6c500909da88';

function getWeather(lat, lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const temparature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temparature}℃ @${place}`;
    })
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log("error")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords == null){
        askForCoords();
    }else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();