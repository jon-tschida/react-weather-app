import React from 'react'

export default function Header() {

    const [formData, setFormData] = React.useState("")

    const handleChange = (event) => {
        setFormData(event.target.value)
    }
    
    console.log(formData)

  return (
    <div>
        <div>
            <form>
                <input type="text" placeholder='Duluth MN' onChange={handleChange} value={formData}></input>
            </form>
        </div>
    </div>
  )
}
