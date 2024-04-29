import AsyncStorage from "@react-native-async-storage/async-storage";

export const setLocalUser = async (token: string):Promise<void> => {
  await AsyncStorage.setItem("token", token)
}

export const getLocalUser = async ():Promise<string | false> => {
  const token = AsyncStorage.getItem("token")
  return token? token : false
}

export const removeLocalUser = async (): Promise<void> => {
  await AsyncStorage.removeItem("token")
} 

