import React from 'react'
import "../Settings.css"

export default function Settings() {
    const [isOpen, setIsOpen] = React.useState(false)

    const handleClick = () => setIsOpen(prevState => !prevState)


  return (

    <div className={isOpen ? "settings open" : "settings"}>
        <>
        <span className="material-symbols-outlined close-menu" onClick={handleClick}>{isOpen ? 'close' : 'menu'}</span>
        <div className='settings-menu'>
        <br />
            <ul>
                <li><button>Change Location</button></li>
                <li>F<span className="material-symbols-outlined f-or-c">toggle_off</span>C</li>
                <li>mph<span className="material-symbols-outlined f-or-c">toggle_off</span>kph</li>
            </ul>
        </div>
        </>
    </div>
  )
}
