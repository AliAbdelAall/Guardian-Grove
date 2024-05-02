import AsyncStorage from "@react-native-async-storage/async-storage";

export const setLocalUser = async (token: string):Promise<void> => {
  await AsyncStorage.setItem("token", token)
}

export const getLocalUser = async ():Promise<string> => {
  const token = await AsyncStorage.getItem("token")
  return token? token : ""
}

export const removeLocalUser = async (): Promise<void> => {
  await AsyncStorage.removeItem("token")
} 

