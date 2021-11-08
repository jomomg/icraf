import { Route, Switch } from 'react-router-dom';
import Login from './components/login';
import Admin from './components/admin';
import UserPage from './components/user_page';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from './utils/authentication';
import './App.css';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
      {...rest}
      render={props =>
          isAuthenticated() ? (<Component {...props} />) : (
              <Redirect
                  to={{
                      pathname: "/login",
                      state: { from: props.location }
                  }}
              />
          )
      }
  />
);

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path='/login' component={Login}/>
      <PrivateRoute path='/admin' component={Admin}/>
      <Route path='/users/:userId' component={UserPage}/>
    </Switch>
  );
}

export default App;
