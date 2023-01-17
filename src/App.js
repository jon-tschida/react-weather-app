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
  
  
  // API call function, bascially copy pasted into our Header as well, using the lat and long from our location api to get weather for that location. 
  async function fetchWeatherData() {
    setLoadingWeatherData(true);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData.locations[0].referencePosition.latitude.toFixed(5)}&lon=${locationData.locations[0].referencePosition.longitude.toFixed(5)}&units=imperial&appid=2a8ab662e8539e2cb45726e6080084e6`);
    const json = await response.json();
    setWeatherData(json);
    setLoadingWeatherData(false);
  }
  // End API call function
  
  
  // UseEffect with loaded in the dependancy array 
  React.useEffect(()=>{ 

      if(loaded) {
        fetchWeatherData();
      }   
  }, [loaded])

  
  // Debugging stuff:

  return (
    <div>
      <Header setLocationData={setLocationData} setLoaded={setLoaded} locationData={locationData} loaded={loaded}/> 
      <h2> { loadingWeatherData ? "Search for a city" : <Weather weatherData={weatherData} locationData={locationData}/> } </h2> 
    </div>
  );
}