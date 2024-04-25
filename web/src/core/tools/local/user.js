export const setLocalUser = (token) => {
  localStorage.token = token
}

export const getLocalUser = () => {
  const token = localStorage.token
  return token ? token : false
}

export const removeLocalUser = () => {
  localStorage.removeItem("token")
}