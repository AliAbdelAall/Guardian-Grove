import axios from "axios"
import { getLocalUser, removeLocalUser } from "../local/user"
import { useNavigate } from "react-router-dom"



axios.defaults.baseURL = "http://localhost:3000"

export const useSendRequest = () => {

  const token = getLocalUser() ?? ""
  const navigate = useNavigate()

  const sendRequest = async (method, route, body) => {
    const headers = {
      'Authorization': `bearer ${token}`,
    }
    if (body instanceof FormData) {
      headers["Content-Type"] = "multipart/form-data"
    } else {
      headers["Content-Type"] = 'application/json'
    }
    try {
      const response = await axios.request({
        method,
        url: route,
        data: body,
        headers,
      })
      return response

    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          removeLocalUser();
          navigate("/");
        }
      }
      console.error(error);
      throw error;
    }
  }
  return sendRequest;
}

