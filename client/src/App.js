import React from 'react';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import NoMatch from './components/NoMatch';
// import Navbar from './components/NavBar';
import Profile from './components/Profile/Profile'
import FetchUser from './components/Auth/FetchUser'
import { Route, Switch, } from 'react-router-dom';
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import './App.scss';

const App = () => (
  <>
  {/* <Navbar /> */}
  <FetchUser>
  <Switch>
    <ProtectedRoute exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/register" component={Register} />
    <Route component={NoMatch} />
  </Switch>
  </FetchUser>
  </>
)

export default App;
