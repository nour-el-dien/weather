// weather side
const dayName= document.getElementById('date-dayname'),
dateToay= document.getElementById('date-day'),
loc= document.getElementById('loc'),
weatherIcon= document.getElementById('weather-icon'),
weatherTemp= document.getElementById('weather-temp'),
weatherDesc= document.getElementById('weather-desc'),


// Change side
searchBar= document.getElementById('search-bar'),
locationButton= document.getElementById('location-button'),

// info-side
humidity=document.getElementById('humidity'),
wind=document.getElementById('wind'),

TodayIcon= document.getElementById('TodayIcon'),
TodayNameList= document.getElementById('TodayNameList'),
Todaycurn= document.getElementById('Todaycurn'),

nextIcon= document.getElementById('nextIcon'),
nextNameList= document.getElementById('nextNameList'),
nextMax= document.getElementById('nextMax'),
nextmin= document.getElementById('nextMin'),

subsequentIcon= document.getElementById('subsequentIcon'),
subsequentNameList= document.getElementById('subsequentNameList'),
subsequentMax= document.getElementById('subsequentMax'),
subsequentmin= document.getElementById('subsequentMin');



let monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'],
days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
dataApi ,
response,
city='cairo';


async function getDataApi(){
    dataApi = await fetch (`https://api.weatherapi.com/v1/forecast.json?key=f9ee62d518dc475288a74306232802&q=${city}&days=3`);
    response = await dataApi.json();
    displayToday();
}
getDataApi();



function displayToday(){
    let dateDay = new Date(),
    // handling arr of days
    day=days[dateDay.getDay()],
    nDay=days[dateDay.getDay()+1],
    sDay=days[dateDay.getDay()+2];

    if(day=='Saturday'){
        nDay=days[0];
        sDay=days[1]
    }
    else if (day=='Friday'){
        sDay=days[0]
    }
    // today card
    dayName.innerHTML=  day;
    dateToay.innerHTML= `${dateDay.getDate()} ${monthName[dateDay.getMonth()]} ${dateDay.getFullYear()}`
    loc.innerHTML = response.location.name;
    weatherIcon.innerHTML =`<img src="https://${response.current.condition.icon}" alt="">`
    weatherTemp.innerHTML = `${response.current.temp_c}°C`
    weatherDesc.innerHTML =`${response.current.condition.text}`

    humidity.innerHTML = `${response.current.humidity}%`
    wind.innerHTML = `${response.current.wind_dir}`

    // week list
    TodayIcon.innerHTML=`<img src="https://${response.current.condition.icon}" alt="">` 
    TodayNameList.innerHTML= days[dateDay.getDay()].slice(0, 3);
    Todaycurn.innerHTML = `${response.current.temp_c}°C`;

    nextIcon.innerHTML=`<img src="https://${response.forecast.forecastday[1].day.condition.icon}" alt="">` 
    nextNameList.innerHTML= nDay.slice(0, 3);
    nextMax.innerHTML = `${response.forecast.forecastday[1].day.maxtemp_c}°C`;
    nextmin.innerHTML = `${response.forecast.forecastday[1].day.mintemp_c}°C`;
    
    subsequentIcon.innerHTML=`<img src="https://${response.forecast.forecastday[2].day.condition.icon}" alt="">` 
    subsequentNameList.innerHTML= sDay.slice(0, 3);
    subsequentMax.innerHTML = `${response.forecast.forecastday[2].day.maxtemp_c}°C`;
    subsequentmin.innerHTML = `${response.forecast.forecastday[2].day.mintemp_c}°C`;
    
}

locationButton.addEventListener('click' ,function(){
    city=searchBar.value;
    getDataApi(city)
})