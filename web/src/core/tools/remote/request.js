import axios from "axios"
import { getLocalUser, removeLocalUser } from "../local/user"
import { useNavigate } from "react-router-dom"

const navigate = useNavigate()

axios.defaults.baseURL = "http://localhost:3000"

export const useSendRequest = async (method, route, body) => {
  const token = getLocalUser() ?? ""

  try {
    const response = await axios.request({
      method,
      url: route,
      data: body,
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return response

  } catch (error) {
    if (error.response && error.response.status === 401) {
      removeLocalUser()
      navigate("/");
    } else {
      toast.error("Something Went Wrong")
      console.error(error)
    }
  }
}