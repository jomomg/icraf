import { Route, Switch } from 'react-router-dom';
import Login from './components/login';
import Admin from './components/admin';
import UserPage from './components/user_page';
import './App.css';

function App() {
  return (
    <Switch>
      {/* <Route path="/" exact component={LandingPage}/> */}
      <Route path='/login' component={Login}/>
      <Route path='/admin' component={Admin}/>
      <Route path='/users/:userId' component={UserPage}/>
    </Switch>
  );
}

export default App;
