import React, { useEffect, useState } from 'react'

// Assets
import profilePic from "../../../../assets/images/profile.jpg"

// Redux
import { useSelector } from 'react-redux'
import { parentsSliceName } from '../../../../core/redux/parents'
import { childrenSliceName } from '../../../../core/redux/children'
import StudentCard from '../../../../components/StudentCard'

// Components


const Students = () => {

  const { parents } = useSelector((global) => global[parentsSliceName])
  const { children } = useSelector((global) => global[childrenSliceName])
  const [filteredStudents, setFilteredStudents] = useState([])


  return (
    <div className='flex column full-width students-cards-container'>
      <h2 className='text-acient'> My Students </h2>
      
      <div className='flex column full-width students-search-wrapper'>
        <div>
          <input className='search-input ' placeholder='Search' type="text" onChange={(e) => handleParentSearch(e)}/>

        </div>

          <div className='flex wrap students-cards-wrapper'>

            {filteredStudents?.map((student) => {
              console.log(student)
              const {id, name, dob} = student
              return (
                <StudentCard
                key={id}
                id = {id}
                name={name}
                age={dob}
                profilePic={profilePic}
                />
              )
            })}
           
          </div>


      </div>
    </div>
  )
}

export default Students