import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import NoMatch from './components/NoMatch';
import Navbar from './components/NavBar';
import FetchUser from './components/FetchUser'
import { Route, Switch, } from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
  <>
  <Navbar />
  <FetchUser>
  <Switch>
    <ProtectedRoute exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route component={NoMatch} />
  </Switch>
  </FetchUser>
  </>
)

export default App;
