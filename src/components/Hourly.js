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
                    
                        { clicked[index] &&
                        <>
                            <img className='hourly-weather-icon' src={`http://openweathermap.org/img/wn/${el.weather[0].icon}.png`} />
                            <p className='hourly-temp-desc'>{capitalize(el.weather[0].description)}</p>
                        </>
                        }
                        <p className='hourly-temp'>{Math.round(el.temp)}°</p>
                    </div>

                )
            })
        }
    </div>
  )
}
