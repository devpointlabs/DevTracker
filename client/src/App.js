import React from "react";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import NoMatch from "./components/NoMatch";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import FetchUser from "./components/Auth/FetchUser";
import TodoList from "./components/Todo/TodoList";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import ContactList from './components/Contact/ContactList'
import Tracker from './components/Tracker/Tracker';
import './App.scss';

const App = () => (
  <>
  
  <FetchUser>
  <Switch>
    <ProtectedRoute exact path="/" component={Dashboard} />
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/profile" component={Profile} />
    <Route exact path="/register" component={Register} />
    <ProtectedRoute exact path="/contacts" component={ContactList} />
    <ProtectedRoute exact path="/tasks" component={TodoList} />
    <ProtectedRoute exact path="/tracker" component={Tracker} />
    <ProtectedRoute component={NoMatch} />
  </Switch>
  </FetchUser>
  </>
);

export default App;
