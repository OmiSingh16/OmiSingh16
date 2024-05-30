"use strict";

const dayEL = document.querySelector('.def-day');
const dateEL = document.querySelector('.def-date');
const iconscontainer = document.querySelector('.icons');
const dayInfoEl = document.querySelector('.day-info');
const listContentEl = document.querySelector('.list-content ul')

const API = 'c9b1dae89cdacc177499935074e910a9';


const days = [
  'Sunday' ,
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Staurday'
];

// display the day
const day = new Date();
const dayName = days[day.getDay()];
dayEL.textContent = dayName;

// display the date
let month = day.toLocaleString('default',{month:'long'});
let date = day.getDate();
let year = day.getFullYear();
dateEL.textContent= date+' '+month+' '+year; 

// add event
document.addEventListener('DOMContentLoaded', () => {
  const btnEl = document.getElementById('btnEl');
  const inputEl = document.getElementById('inputEl');

  if (!btnEl || !inputEl) {
    console.error('Element not found');
    return;
  }

  btnEl.addEventListener('click', (e) => {
    e.preventDefault();

  // Check empty value
    if (inputEl.value !== "") {
      const search = inputEl.value;
      inputEl.value = "";
      findLoc(search);
    } else {
      console.log('Please Enter City or Country Name.');
    }
  });
});

async function findLoc(name){
 iconscontainer.innerHTML = '';
 dayInfoEl.innerHTML = '';
 listContentEl.innerHTML='';
  try{
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API}`
    const data = await fetch(API_URL);
    const result = await data.json();
    console.log(result);

    if(result.cod !== '404'){

      //display image content
      const imagecontent = displayImageContent(result);
      // display right side content
      const rightSidecontent = rightSideContent(result);
      // forecast function
      displayForeCast(result.coord.lat , result.coord.lon);

      setTimeout(() => {
        iconscontainer.insertAdjacentHTML('afterbegin' ,imagecontent );
        iconscontainer.classList.add('fadeIn');
        dayInfoEl.insertAdjacentHTML('afterbegin' ,rightSidecontent );
      }, 1500);

    }else{
      const message = `<h2 class="weather-temp">${result.cod}</h2>
    <h3 class="cloud-text">${result.message}</h3>`;
    iconscontainer.insertAdjacentHTML('afterbegin' ,message);
    }
  }catch(error){}
  
};

//display iamge and content

function displayImageContent(result){
  return `
  <img src="https://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png" alt="">
    <h2 class="weather-temp">${Math.round(result.main.temp - 275.15)}°C</h2>
    <h3 class="cloud-text">${result.weather[0].description
    }</h3>`;
}

// display right side content
function rightSideContent(data){
  
  return `<div class="content">
          <p class="title">Location</p>
          <span class="value">${data.name}</span>
        </div>
        <div class="content">
          <p class="title">Temp</p>
          <span class="value">${Math.round(data.main.temp - 275.15)}°C</span>
        </div>
        <div class="content">
          <p class="title">Humidity</p>
          <span class="value">${data.main.humidity}%</span>
        </div>
        <div class="content">
          <p class="title">Wind Speed</p>
          <span class="value">${data.wind.speed}</span>
        </div>`;
}

async function displayForeCast(lat , long){
  const ForeCast_API = `
  https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API}
  `
  const data = await fetch(ForeCast_API);
  const result = await data.json();
  
  //filter the forecast
  const uniqueForeCastDays = [];
  const daysForeCast = result.list.filter((forecast)=>{
    const forecastDate = new Date(forecast.dt_txt).getDate();
    if(!uniqueForeCastDays.includes(forecastDate)){
      return uniqueForeCastDays.push(forecastDate);
    }
    
  })
  
  daysForeCast.forEach((content , index) => {
    if(index <= 3){
      listContentEl.insertAdjacentHTML('afterbegin',forecast(content))
    }
  });
}





//forecast  html element data 
function forecast(frcontent){
  const day = new Date(frcontent.dt_txt);
  const dayName = days[day.getDay()];
  const splitDay = dayName.split('',3);
  const joinDay = splitDay.join('');

  return ` <li>
  <img src="https://openweathermap.org/img/wn/${frcontent.weather[0].icon}@2x.png">
  <span>${joinDay}</span>
  <span class="day-temp">${Math.round(frcontent.main.temp - 275.15)}°C</span>
</li>`;
}
function verify() {
  
  var e2=document.getElementById('remoove');
  var e3=document.getElementById('welcome')
    e2.style.display = 'block';
    e3.style.display ="none";
}

// dragging content
const draggable = document.getElementById('draggable');

draggable.addEventListener('mousedown', (e) => {
  // Prevent default text selection behavior
  e.preventDefault();
  
  // Add the no-select class to the body to prevent text selection
  document.body.classList.add('no-select');

  // Get the initial mouse position and element's position
  const startX = e.clientX;
  const startY = e.clientY;
  const rect = draggable.getBoundingClientRect();
  const offsetX = startX - rect.left;
  const offsetY = startY - rect.top;

  function onMouseMove(e) {
    // Calculate the new position
    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;
    
    // Set the new position
    draggable.style.left = `${newX}px`;
    draggable.style.top = `${newY}px`;
  }

  function onMouseUp() {
    // Remove the event listeners when mouse is released
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    // Remove the no-select class from the body
    document.body.classList.remove('no-select');
  }

  // Add the event listeners for mousemove and mouseup
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// Prevent dragging from interfering with other interactions
document.addEventListener('mousedown', (e) => {
  if (e.target !== draggable) {
    document.body.classList.remove('no-select');
  }
});

// Prevent default action for search box mousedown
document.getElementById('inputEl').addEventListener('mousedown', (e) => {
  e.stopPropagation();
});