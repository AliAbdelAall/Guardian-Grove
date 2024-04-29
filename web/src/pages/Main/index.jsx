import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

// Styles
import "./style.css"

// Redux
import { useDispatch } from "react-redux"
import { setchildren } from '../../core/redux/children'
import { setParents } from '../../core/redux/parents'
import { setProfile } from '../../core/redux/userProfle'

// Tools
import { useSendRequest } from '../../core/tools/remote/request'
import { requestMethods } from '../../core/enums/requestMethods'

// Toastify
import { toast } from 'react-toastify'

// Components
import Sidebar from './components/Sidebar'


const Main = () => {

  const sendRequest = useSendRequest()
  const dispatch = useDispatch()
  const[ role, setRole] = useState("")

  useEffect(()=>{
    checkRole()
  },[])

  const checkRole = () => {
    sendRequest(requestMethods.GET, "/api/web/check-role").then((response) => {
      if(response.status === 200){
        const { userRole, profile } = response.data
        setRole(userRole)
        dispatch(setProfile(profile))
        userRole === "Teacher" ? loadStudents() : loadClients()
        
      }
    }).catch((error) => {
      toast.error("something went wrong...")
  })
  }

  const loadStudents = () => {
    
  }

  const loadClients = () => {
    sendRequest(requestMethods.GET, "/api/psychologist/get-clients").then((response) => {
      if(response.status === 200){
        console.log(response.data)
        const clients = response.data.clients
        const parentsList = []
        const childrenList = []

        clients?.forEach((client) => {
          console.log(client)
          const {children, ...parent} = client
          parentsList.push(parent)
          console.log(children)
          childrenList.push(...children)
        })
        console.log(childrenList)
        console.log(parentsList)
        dispatch(setParents(parentsList))
        dispatch(setchildren(childrenList))
        toast.success("load successful")
      }
      }).catch((error) => {
        toast.error("something went wrong...")
      })
  }


  return (
    <div className='flex '>
      <Sidebar role={role}/>
      <Outlet/>
    </div>

  )
}

export default Main