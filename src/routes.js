import React from 'react'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import { isLogged } from './utils/Auth'
const Login = React.lazy(() => import('./pages/Login/Login'))
const Register = React.lazy(() => import('./pages/Register/Register'))
const Home = React.lazy(() => import('./pages/Home/Home'))
const ValidateEmail = React.lazy(() =>
  import('./pages/ValidateEmail/ValidateEmail')
)
/* const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLogged() ? (
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
 */
const UnloggedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLogged() ? (
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
        <Route path='/' exact component={Home}></Route>
        <Route path='/validate/:token' exact component={ValidateEmail}></Route>
        <UnloggedRoute path='/login' component={Login}></UnloggedRoute>
        <UnloggedRoute path='/register' component={Register}></UnloggedRoute>
      </Switch>
    </BrowserRouter>
  )
}
