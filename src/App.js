import React from 'react';
import Header from './components/Header';

// Durham NC API call, we'll want to get the lat and long from the user though down the road. 
// https://api.openweathermap.org/data/2.5/weather?lat=35.994034&lon=-78.898621&units=imperial&appid=2a8ab662e8539e2cb45726e6080084e6
//


const formatInput = (text) => text.replace(/ /g, "%");

export default function App() {
  return (
    <div>
      <Header />
    </div>
  );
}