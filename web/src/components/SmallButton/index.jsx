import React from 'react'

// Styles
import "./style.css"


const SmallButton = ({text, handleClick}) => {
  return (

    <button className='small-btn text-regular white bg-primary' onClick={handleClick}>{text}</button>
  )
}

export default SmallButton