import React from 'react'

// Assets
import profilePic from "../../../../assets/images/profile.jpg"

// Redux
import { useSelector } from 'react-redux'
import { parentsSliceName } from '../../../../core/redux/parents'
import { childrenSliceName } from '../../../../core/redux/children'

// Components
import ClientCard from '../../../../components/ClientCard'

const Clients = () => {

  const { parents } = useSelector((global) => global[parentsSliceName])
  const { children } = useSelector((global) => global[childrenSliceName])

  return (
    <div className='flex column full-width clients-cards-container'>
      <h2 className='text-acient'> My Clients </h2>
      
      <div className='flex column full-width clients-search-wrapper'>
        <div>
          <input className='search-input ' placeholder='Search' type="text" />

        </div>

          <div className='flex wrap clients-cards-wrapper'>

            {parents?.map((parent) => {
              const {id, profile} = parent
              const parentChildren = children.filter((child) => child.parentId === parent.id)
              const childrenNames = []
              parentChildren.forEach(child => {childrenNames.push(child.name)})
              return (
                <ClientCard
                key={id}
                id = {profile.id}
                name={`${profile.firstName} ${profile.lastName}`}
                age={profile.dob}
                profilePic={profilePic}
                email={profile.email}
                children={childrenNames}
                />
              )

            })}
           
          </div>


      </div>
    </div>
  )
}

export default Clients