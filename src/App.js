import React from 'react';
import Header from './components/Header';
import Weather from './components/Weather';

// Durham NC API call, we'll want to get the lat and long from the user though down the road. 
// https://api.openweathermap.org/data/2.5/weather?lat=35.994034&lon=-78.898621&units=imperial&appid=2a8ab662e8539e2cb45726e6080084e6
//


export default function App() {
  const [locationData, setLocationData] = React.useState()
  const [loaded, setLoaded] = React.useState(false)
  const [weatherData, setWeatherData] = React.useState()
  const [loadingWeatherData, setLoadingWeatherData] = React.useState(true);
  const [loadingDailyWeatherData, setLoadingDailyWeatherData] = React.useState(true)
  const [dailyWeatherData, setDailyWeatherData] = React.useState()
  
  
  // API call function, bascially copy pasted into our Header as well, using the lat and long from our location api to get weather for that location. 
  async function fetchWeatherData() {
    setLoadingWeatherData(true);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData.locations[0].referencePosition.latitude.toFixed(5)}&lon=${locationData.locations[0].referencePosition.longitude.toFixed(5)}&units=imperial&appid=2a8ab662e8539e2cb45726e6080084e6`);
    const json = await response.json();
    setWeatherData(json);
    setLoadingWeatherData(false);
    console.log(`TODAYS WEATHER API CALLED!`)
  }
  // End API call function

  //API call for our daily weather
  async function fetchDailyWeatherData() {
    setLoadingDailyWeatherData(true)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${locationData.locations[0].referencePosition.latitude.toFixed(5)}&lon=${locationData.locations[0].referencePosition.longitude.toFixed(5)}&units=imperial&appid=2a8ab662e8539e2cb45726e6080084e6`);
    const json = await response.json();
    setDailyWeatherData(json);
    setLoadingDailyWeatherData(false);
    console.log(`DAILY API CALLED!`)
  }
  
  
  // UseEffect with loaded in the dependancy array 
  React.useEffect(()=>{ 

      if(loaded) {
        fetchDailyWeatherData();
        fetchWeatherData();
      }   
  }, [loaded])

  
  // Debugging stuff:

  return (
    <div>
      <Header setLocationData={setLocationData} setLoaded={setLoaded} locationData={locationData} loaded={loaded}/> 
      <h2> {loadingWeatherData ? null : <Weather weatherData={weatherData} locationData={locationData} dailyWeatherData={dailyWeatherData} loadingDailyWeatherData={loadingDailyWeatherData}/> } </h2> 
    </div>
  );
}