import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RequireAuth from './components/RequireAuth'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import SignOut from './pages/SignOut';
import CartResume from './pages/CartResume';

export default () => {
 return (
   <BrowserRouter>
    <Switch>
      <Route exact path='/' component={RequireAuth(Home)}/>
      <Route exact path='/cartResume' component={RequireAuth(CartResume)}/>
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Route path="/signout" component={SignOut} />
    </Switch>
   </BrowserRouter>
 )
}