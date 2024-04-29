export const setLocalUser = (token: string) => {
  localStorage.token = token
}

export const getLocalUser = (): string | false => {
  const token = localStorage.token
  return token ? token : false
}

export const removeLocalUser = (): void => {
  localStorage.removeItem("token")
}