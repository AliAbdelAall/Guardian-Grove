import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// Assets
import logo from "../../../../assets/logo/logo.png"

// Redux
import { useSelector } from 'react-redux'
import { userProfileSliceName } from '../../../../core/redux/userProfile'

// Components
import SmallButton from '../../../../components/SmallButton'
import { removeLocalUser } from '../../../../core/tools/local/user'

const Sidebar = ({ role }) => {

  const { profile } = useSelector((global) => global[userProfileSliceName])
  const navigate = useNavigate()
  const location = useLocation()

  const sidebarLinks = {
    Psychologist: [
      { path: "/main/psychologist", text: "Clients" },
      { path: "/main/psychologist/schedules", text: "Schedules" },
      { path: "/main/psychologist/chat", text: "Chat" },
      { path: "/main/psychologist/feedback", text: "Feedback" },
      { path: "/main/psychologist/profile", text: "Profile" },
    ],
    Teacher: [
      { path: "/main/teacher", text: "Students" },
      { path: "/main/teacher/chat", text: "Chat" },
      { path: "/main/teacher/reports", text: "Reports" },
      { path: "/main/teacher/profile", text: "Profile" },
    ],
  }

  const userLinks = sidebarLinks[role] || []


  const handleLogout = () => {
    removeLocalUser()
    navigate("/")
  }
  return (
    <div className='flex column align-center sidebar-container'>
      <img src={logo} height={101} alt="logo" />
      <div className='flex column full-width sidebar-name'>
        <p className='text-acient font-light'>Welcome,</p>
        <p className='font-regular text-acient'>{role === "Teacher" ?` ${profile.firstName} ${profile.lastName}` : `Dr. ${profile.firstName} ${profile.lastName}`}</p>
      </div>
      <div className='flex column full-width sidebar-nav'>
        {userLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`sidebar-btn ${location.pathname === link.path ? "sidebar-active white" : "text-acient"} text-lg full-width`}
          >
            {link.text}
          </Link>
        ))}
      </div>
      <div className='flex align-end sidebar-logout'>
        <SmallButton
        text={"Logout"}
        handleClick={handleLogout}
        />
      </div>

    </div>
  )
}

export default Sidebar
