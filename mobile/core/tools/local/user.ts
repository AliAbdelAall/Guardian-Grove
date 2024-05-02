import AsyncStorage from "@react-native-async-storage/async-storage";

export const setLocalUser = async (token: string):Promise<void> => {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (error) {
    console.error("Error setting token:", error);
  }
}

export const getLocalUser = async ():Promise<string> => {
  try {
    const token = await AsyncStorage.getItem("token")
    return token? token : ""
  } catch (error) {
    console.error("Error setting token:", error);
  }
}

export const removeLocalUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("token")
  } catch (error) {
    console.error("Error setting token:", error);
  }
} 

