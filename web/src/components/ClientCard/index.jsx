import React from 'react'

// Styles
import "./style.css"

const ClientCard = ({profilePic, name, age, email, children = [], }) => {
  return (
    <div className='flex column center client-card'>
      <img className='client-image' src={profilePic} width={90}  height={90}  alt="profile" />
      <div className='flex column full-width client-info-wrapper'>
        <div className='flex space-between full-width client-info'>
          <p className='font-medium text-acient'>Name</p>
          <p className='font-light text-acient'>{name}</p>
        </div>
        <div className='flex space-between full-width client-info'>
          <p className='font-medium text-acient'>Age</p>
          <p className='font-light text-acient'>{`${age} years old`}</p>
        </div>
        <div className='flex space-between full-width client-info'>
          <p className='font-medium text-acient'>Email</p>
          <p className='font-light text-acient'>{email}</p>
        </div>
        <div className='flex space-between full-width client-info'>
          <p className='font-medium text-acient'>Children</p>
          <p className='font-light text-acient'>{children}</p>
        </div>
      </div>
    </div>
  )
}

export default ClientCard