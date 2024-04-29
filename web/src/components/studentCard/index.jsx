import React from 'react'

// Styles
import "./style.css"

const StudentCard = ({profilePic, name, age }) => {
  return (
    <div className='flex column center student-card'>
      <img className='student-image' src={profilePic} width={90}  height={90}  alt="profile" />
      <div className='flex column full-width student-info-wrapper'>
        <div className='flex space-between full-width student-info'>
          <p className='font-medium text-acient'>Name</p>
          <p className='font-light text-acient'>{name}</p>
        </div>
        <div className='flex space-between full-width student-info'>
          <p className='font-medium text-acient'>Age</p>
          <p className='font-light text-acient'>{`${age} years old`}</p>
        </div>
      </div>
    </div>
  )
}

export default StudentCard