import axios, { AxiosResponse } from "axios"
import { getLocalUser, removeLocalUser } from "../local/user"
import { useNavigation } from "@react-navigation/native"
import {useRouter} from "expo-router"

const router = useRouter()

axios.defaults.baseURL = "http://localhost:3000"

interface ErrorResponse {
  response: {
    status: number;
  }
}

export const useSendRequest = () => {
  const token = getLocalUser() ?? ""
  const navigation = useNavigation()

  const sendRequest = async (method: string, route: string, body?: any) => {
    try {
      const response: AxiosResponse = await axios.request({
        method,
        url: route,
        data: body,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      return response
    } catch (error) {
      if ((error as ErrorResponse).response) {
        const { status } = (error as ErrorResponse).response;
        if (status === 401) {
          removeLocalUser()
          router.dismissAll
        }
      }
      console.error(error)
      throw error
    }
  }
  return sendRequest
}