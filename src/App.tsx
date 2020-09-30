import React from 'react'
import { ThemeProvider } from 'styled-components'
import Login from './pages/Login/Login'
import theme from './styles/theme'
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Login />
      </div>
    </ThemeProvider>
  )
}

export default App
