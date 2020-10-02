import React, { Suspense } from 'react'
import { ThemeProvider } from 'styled-components'
import ReactNotification from 'react-notifications-component'
import theme from './styles/theme'
import Routes from './routes'
import Spinner from './components/Spinner/Spinner'
import GlobalStyles from './styles/global'
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Spinner />}>
        <GlobalStyles />
        <ReactNotification />
        <Routes />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
