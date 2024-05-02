import axios, { AxiosResponse } from "axios"
import { getLocalUser, removeLocalUser } from "../local/user"
import {useRouter} from "expo-router"

axios.defaults.baseURL = "http://192.168.0.201:3000"

interface ErrorResponse {
  response: {
    status: number;
  }
}

export const useSendRequest = () => {
  const router = useRouter()

  const sendRequest = async (method: string, route: string, body?: any) => {
    try {
      const token = await getLocalUser() ?? ""
      console.log("request is here")
      const response: AxiosResponse = await axios.request({
        method,
        url: route,
        data: body,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      console.log(response)
      return response
    } catch (error) {
      const { status } = (error as ErrorResponse).response;
      if (status === 401) {
        await removeLocalUser()
        router.dismissAll
      }
      console.error(error)
      throw error
    }
  }
  return sendRequest
}