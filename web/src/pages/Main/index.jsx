import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

// Styles
import "./style.css"

// Redux
import { useDispatch } from "react-redux"
import { setchildren } from '../../core/redux/children'
import { setParents } from '../../core/redux/parents'

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

  useEffect(()=>{
    loadParents()
  },[])

  const loadParents = () => {
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
      <Sidebar/>
      <Outlet/>
    </div>

  )
}

export default Main