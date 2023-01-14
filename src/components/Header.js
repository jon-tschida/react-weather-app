import React from 'react'


// function for setting up 12 hour time instead of 24 hour time.
const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = `${hours} : ${minutes}${ampm}`;
    return strTime;
  }
  
  // formating our date with these options, maybe the user can change this in the future?
  const dayOptions = {
    month: "long",
    day: "numeric",
    weekday: `short`,
  };

  // formating our user input, replacing spaces with % for our API call. 
  const formatInput = (text) => text.replace(/ /g, "%");

export default function Header(props) {

    const [formData, setFormData] = React.useState("")
    const [curTime, setCurTime] = React.useState(new Date())
    const [curDate, setCurDate] = React.useState();

    // loading state to change our button from `Search` to `Searching...`
    const [loading, setLoading] = React.useState();

    // interval for properly showing date and time, updates the time ever 5 seconds
    React.useEffect(()=>{
        const interval = setInterval(()=>{
            setCurTime(new Date())
            setCurDate(new Date())
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    // end date and time 


    const handleChange = (event) => {
        setFormData(event.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        async function fetchData() {
            setLoading(true);
            const response = await fetch(`https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${formatInput(formData)}&apiKey=NDVkZjZlYTFmNWMzNGEyZmIzNzMwMzNkNjkxMDRjMjQ6ZTM5OGNmOGItY2ZlNS00N2ZmLTg5YTAtZGUxMjE2ODMxMDc3`);
            const json = await response.json();
            props.setLocationData(json)
            setLoading(false);
            props.setLoaded(true)
        }

        // Only ping the API if the search-field isn't empty. If it is, we alert the user. 
        if (formData.length > 0) fetchData();
        else alert("Search field can't be empty")

    }
    const formatDay = new Intl.DateTimeFormat(`en-US`, dayOptions).format(
        curDate
      );

  return (
    <div className='header-container'>
        <div className='header-form-div'>
            
            <div className="date-time">
                <p className="time">{formatAMPM(curTime)}</p>
                <p className="date">{formatDay}</p>
            </div>
            {
            props.loaded 
            ? 
                <p className='date'>
                {props.locationData.locations[0].formattedAddress}
                </p>
            :
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Duluth MN' onChange={handleChange} value={formData}></input>
                    {loading ? <button className="button-searching" type='submit'>Searching...</button> : <button type='submit'>Search</button>}
                </form>
            }
        </div>
    </div>
  )
}
