import React from 'react'


  // formating our user input, replacing spaces with % for our API call. 
  const formatInput = (text) => text.replace(/ /g, "%");

export default function Header(props) {

    const [formData, setFormData] = React.useState("")

    // loading state to change our button from `Search` to `Searching...`
    const [loading, setLoading] = React.useState();
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
  return (
    <div className='header-container'>
        <div className='header-form-div'>
            {
            props.loaded 
            ? 
                null
            :
            <div>
                <p className='weather-container-header'></p>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Duluth MN' onChange={handleChange} value={formData} />
                    {loading ? <img src={require("../images/loading.png")} className="search-loading"/> : <button type='submit' className='material-symbols-outlined'>search</button>}
                </form>
            </div>
            }
        </div>
    </div>
  )
}
