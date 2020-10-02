const userLogged = () => {
  return localStorage.getItem('user') || sessionStorage.getItem('user') || ''
}

export default userLogged
