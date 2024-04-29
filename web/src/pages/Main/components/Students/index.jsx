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

  const { children } = useSelector((global) => global[childrenSliceName])
  const [filteredStudents, setFilteredStudents] = useState([])

  console.log(filteredStudents)
  useEffect(()=>{
    setFilteredStudents(children)
  },[children])

  const handleStudentSearch = (e) => {
    console.log (children)
    console.log (children[0])
    const userSearch = e.target.value.toLowerCase();
    setFilteredStudents(children.filter((child) => child.name.toLowerCase().includes(userSearch))
    )
  }

  const calculateStudentAge = (dob) => {

    const birthDate = new Date(dob)
  
    if (isNaN(birthDate.getTime())) {
      return null
    }
  
    const currentDate = new Date();
  
    const difference = currentDate.getTime() - birthDate.getTime();
  
    const age = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
  
    return age;
  }
  

  return (
    <div className='flex column full-width students-cards-container'>
      <h2 className='text-acient'> My Students </h2>
      
      <div className='flex column full-width students-search-wrapper'>
        <div>
          <input className='search-input ' placeholder='Search' type="text" onChange={(e) => handleStudentSearch(e)}/>

        </div>

          <div className='flex wrap students-cards-wrapper'>

            {filteredStudents?.map((student) => {
              console.log(student)
              const {id, name, dob} = student
              const age = calculateStudentAge(dob)
              return (
                <StudentCard
                key={id}
                id = {id}
                name={name}
                age={age}
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