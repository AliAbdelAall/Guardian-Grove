import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// Assets
import logo from "../../../../assets/logo/logo.png"

// Components
import SmallButton from '../../../../components/SmallButton'
import { removeLocalUser } from '../../../../core/tools/local/user'

const Sidebar = ({ role = 'Psychologist' }) => {
  const firstName = "Jhon"
  const lastName = "Doe"
  const navigate = useNavigate()
  const location = useLocation()

  const sidebarLinks = {
    Psychologist: [
      { path: "/main", text: "Clients" },
      { path: "/main/schedules", text: "Schedules" },
      { path: "/main/chat", text: "Chat" },
      { path: "/main/feedback", text: "Feedback" },
      { path: "/main/profile", text: "Profile" },
    ],
    Teacher: [
      { path: "/main", text: "Students" },
      { path: "/main/chat", text: "Chat" },
      { path: "/main/reports", text: "Reports" },
      { path: "/main/profile", text: "Profile" },
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
      <p className='text-acient font-light'>Welcome <span className='font-regular'>{`Dr. ${firstName} ${lastName}`}</span></p>
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
