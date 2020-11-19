import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import React from 'react'
import User from '../views/User'
import Apps from '../views/Apps'
import Home from '../views/Home'
import Layout from '../components/layout'
export default () => (
  <Router>
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/user" component={User} />
      <Route path="/apps" component={Apps} />
      <Redirect from="/" to="/home" exact />
    </Switch>
    <Layout />
  </Router>
)
