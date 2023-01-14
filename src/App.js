import React from 'react';
import Header from './components/Header';

// Durham NC API call, we'll want to get the lat and long from the user though down the road. 
// https://api.openweathermap.org/data/2.5/weather?lat=35.994034&lon=-78.898621&units=imperial&appid=2a8ab662e8539e2cb45726e6080084e6
//


export default function App() {
  const [locationData, setLocationData] = React.useState()
  const [loading, setLoading] = React.useState(true)
  // const [weatherData, setWeatherData] = React.useState()
  loading ? console.log(`no location data`): console.log(locationData)


  return (
    <div>
      <Header setLocationData={setLocationData} setLoading={setLoading} locationData={locationData} loading={loading}/> 
      <h2>{loading ? "Search for a city" : locationData.locations[0].referencePosition.latitude.toFixed(5)}</h2>
    </div>
  );
}