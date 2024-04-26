import React from 'react'

// Styles
import "./style.css"


const SmallButton = ({text, handleClick}) => {
  return (
    <div className='flex justify-end full-width'>
      <button className='small-btn text-regular white bg-primary' onClick={handleClick}>{text}</button>
    </div>

  )
}

export default SmallButton