import React from 'react'

// Assets
import profilePic from "../../../../assets/images/profile.jpg"

// Components
import ClientCard from '../../../../components/ClientCard'

const Clients = () => {
  return (
    <div className='flex column clients-cards-container'>
      <h2 className='text-acient'> My Clients </h2>
      
      <div className='flex column clients-search-wrapper'>
        <div>
          <input className='search-input ' placeholder='Search' type="text" />

        </div>
        <div className='flex full-width'>
          <div className='flex wrap clients-cards-wrapper'>
            <ClientCard
            key={1}
            name={"John Doe"}
            age={"37"}
            profilePic={profilePic}
            email={"jhon@gmail.com"}
            phone={"+96170123456"}
            children={"Mathew, Jolly, Nada"}
            />
            <ClientCard
            key={2}
            name={"John Doe"}
            age={"37"}
            profilePic={profilePic}
            email={"jhon@gmail.com"}
            phone={"+96170123456"}
            children={"Mathew, Jolly, Nada"}
            />
            <ClientCard
            key={3}
            name={"John Doe"}
            age={"37"}
            profilePic={profilePic}
            email={"jhon@gmail.com"}
            phone={"+96170123456"}
            children={"Mathew, Jolly, Nada"}
            />
            <ClientCard
            key={4}
            name={"John Doe"}
            age={"37"}
            profilePic={profilePic}
            email={"jhon@gmail.com"}
            phone={"+96170123456"}
            children={"Mathew, Jolly, Nada"}
            />
            <ClientCard
            key={5}
            name={"John Doe"}
            age={"37"}
            profilePic={profilePic}
            email={"jhon@gmail.com"}
            phone={"+96170123456"}
            children={"Mathew, Jolly, Nada"}
            />
            <ClientCard
            key={6}
            name={"John Doe"}
            age={"37"}
            profilePic={profilePic}
            email={"jhon@gmail.com"}
            phone={"+96170123456"}
            children={"Mathew, Jolly, Nada"}
            />
            <ClientCard
            key={7}
            name={"John Doe"}
            age={"37"}
            profilePic={profilePic}
            email={"jhon@gmail.com"}
            phone={"+96170123456"}
            children={"Mathew, Jolly, Nada"}
            />

          </div>
        </div>

      </div>
    </div>
  )
}

export default Clients