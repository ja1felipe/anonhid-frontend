const isLogged = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token')
}

const logout = () => {
  localStorage.clear()
  sessionStorage.clear()
}

export { isLogged, logout }
