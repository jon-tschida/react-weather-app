import React from 'react';
import Header from './components/Header';
import Weather from './components/Weather';
// import Settings from './components/Settings';

// Durham NC API call, we'll want to get the lat and long from the user though down the road. 
// https://api.openweathermap.org/data/2.5/weather?lat=35.994034&lon=-78.898621&units=imperial&appid=2a8ab662e8539e2cb45726e6080084e6
//


export default function App() {
  const [loaded, setLoaded] = React.useState(false)
  const [weatherData, setWeatherData] = React.useState()
  const [loadingWeatherData, setLoadingWeatherData] = React.useState(true);
  const [loadingDailyWeatherData, setLoadingDailyWeatherData] = React.useState(true)
  const [dailyWeatherData, setDailyWeatherData] = React.useState()
  const [locationData, setLocationData] = React.useState([])
  
  
  
  // UseEffect with loaded in the dependancy array 
  React.useEffect(()=>{ 
      // API call function, bascially copy pasted into our Header as well, using the lat and long from our location api to get weather for that location. 
  async function fetchWeatherData() {
    setLoadingWeatherData(true);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData.locations[0].referencePosition.latitude.toFixed(5)}&lon=${locationData.locations[0].referencePosition.longitude.toFixed(5)}&units=imperial&appid=2a8ab662e8539e2cb45726e6080084e6`);
    const json = await response.json();
    setWeatherData(json);
    setLoadingWeatherData(false);
  }
  // End API call function

  //API call for our daily weather
  async function fetchDailyWeatherData() {
    setLoadingDailyWeatherData(true)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${locationData.locations[0].referencePosition.latitude.toFixed(5)}&lon=${locationData.locations[0].referencePosition.longitude.toFixed(5)}&units=imperial&appid=2a8ab662e8539e2cb45726e6080084e6`);
    const json = await response.json();
    setDailyWeatherData(json);
    setLoadingDailyWeatherData(false);
  }

      if(loaded) {
        fetchDailyWeatherData();
        fetchWeatherData();
      }   
  }, [loaded, locationData.locations])

  
  // Debugging stuff:
  return (
    <div className='beegmode'> 
      <div> {loadingWeatherData ? <Header setLocationData={setLocationData} setLoaded={setLoaded} locationData={locationData} loaded={loaded}/>  : <Weather weatherData={weatherData} locationData={locationData} dailyWeatherData={dailyWeatherData} loadingDailyWeatherData={loadingDailyWeatherData} setLoadingWeatherData={setLoadingWeatherData} /> } </div> 
    </div>
  );
}