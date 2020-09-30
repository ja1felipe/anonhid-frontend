import React from 'react'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
const Login = React.lazy(() => import('./pages/Login/Login'))
const Register = React.lazy(() => import('./pages/Register/Register'))

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

const UnloggedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('token') || sessionStorage.getItem('token') ? (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
)

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <UnloggedRoute path='/login' component={Login}></UnloggedRoute>
        <UnloggedRoute path='/register' component={Register}></UnloggedRoute>
      </Switch>
    </BrowserRouter>
  )
}
