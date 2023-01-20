import React from 'react'

export default function Hourly(props) {

    const {dailyWeatherData, formatAMPM, capitalize} = props;

    const [clicked, setClicked] = React.useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false
    });

    const handleClick = (index) => {
        setClicked(prevState => ({
            ...prevState,
            [index]: !prevState[index]

        }))
      };

  return (
    <div className='hourly-weather-container'>

        {
            dailyWeatherData.hourly.map((el, index) =>{
                return (
                    index > 0 && index < 7 && 
                    <div className="hourly-weather" onClick={() => handleClick(index)} key={index}>
                        <p className='hour'>{formatAMPM(new Date(el.dt * 1000))}</p>
                        <p className='hourly-temp'>{Math.round(el.temp)}°</p>
                    
                        { clicked[index] &&
                        <>
                            <img className='hourly-weather-icon' alt='weather icon' src={`http://openweathermap.org/img/wn/${el.weather[0].icon}.png`} />
                            <p className='hourly-temp-desc'>{capitalize(el.weather[0].description)}</p>
                        
                        {/* Conditionally rendering snow and rain fall. These only populate if snow or rain are forecasted.
                        We check to see if the entry is there "!!el.rain" and "!!el.snow" respectively, if so, we display the forecast */}
                        { !!el.rain &&
                            <div className='daily-more-info-row'>
                                <img src={require('../images/rain.png')} alt="rain icon" className="daily-sunrise-sunset-icon"/> 
                                <p className='daily-sunrise-sunset-time'>{el.rain["1h"]}</p>
                            </div>
                        }
                        { !!el.snow &&
                            <div className='daily-more-info-row'>
                                <img src={require('../images/snow.png')} alt="snow icon" className="daily-sunrise-sunset-icon"/> 
                                <p className='daily-sunrise-sunset-time'>{el.snow["1h"]} mm</p>
                            </div>
                        }
                        </>
                        }
                    
                    </div>

                )
            })
        }
    </div>
  )
}
