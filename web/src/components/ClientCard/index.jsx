import React from 'react'

// Styles
import "./style.css"

// Assets
import "../../assets/images/profile.jpg"

const ClientCard = () => {
  return (
    <div className='flex column center client-card'>
      <img className='client-image' src={profilePic} width={90}  height={90}  alt="profile" />
      <div className='flex column full-width client-info-wrapper'>
        <div className='flex space-between full-width client-info'>
          <p className='font-medium text-acient'>Name</p>
          <p className='font-light text-acient'>Jhon Doe</p>
        </div>
        <div className='flex space-between full-width client-info'>
          <p className='font-medium text-acient'>Age</p>
          <p className='font-light text-acient'>37 years old</p>
        </div>
        <div className='flex space-between full-width client-info'>
          <p className='font-medium text-acient'>Children</p>
          <p className='font-light text-acient'>Mathew, Andrew, Jolly</p>
        </div>
        <div className='flex space-between full-width client-info'>
          <p className='font-medium text-acient'>Phone</p>
          <p className='font-light text-acient'>+96170123456</p>
        </div>
        <div className='flex space-between full-width client-info'>
          <p className='font-medium text-acient'>Email</p>
          <p className='font-light text-acient'>jhon@gmail.com</p>
        </div>
      </div>
    </div>
  )
}

export default ClientCard