import React from 'react'
import "../Settings.css"

export default function Settings(props) {

    const {toggle, setToggle} = props;

    const [isOpen, setIsOpen] = React.useState(false)

    const openSettings = () => setIsOpen(prevState => !prevState)

  const handleToggle = (stateToChange) => {
    setToggle(prevState => {
      return {
        ...prevState,
        [stateToChange]: !prevState[stateToChange]
      }
    })
  }

  return (

    <div className={isOpen ? "settings open" : "settings"}>
        <>
        <span className="material-symbols-outlined close-menu" onClick={openSettings}>{isOpen ? 'close' : 'menu'}</span>
        <div className='settings-menu'>
        <br />
            <ul>
                <li><button>New Location <span className="material-symbols-outlined location-pin">location_on</span></button></li>
                <li>F<span className="material-symbols-outlined f-or-c" onClick={()=>handleToggle("F_or_C")}>{toggle[`F_or_C`] ? `toggle_off` : `toggle_on`}</span>C</li>
                <li>mph<span className="material-symbols-outlined f-or-c" onClick={()=>handleToggle("mph_or_kph")}>{toggle[`mph_or_kph`] ? `toggle_off` : `toggle_on`} </span>kph</li>
            </ul>
        </div>
        </>
    </div>
  )
}
