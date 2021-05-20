import React from 'react'

import { Router, Switch, Route,  } from 'react-router-dom'
import Login from '../pages/login'
import Registro from '../pages/registro'
import Home from '../pages/home'
import Song from '../pages/song'
import Post from '../pages/post'
import NotFound from '../components/NotFound'
import PrivateRoute from './PrivateRoute'
import PrivateRouteAdmin from './PrivateRouteAdmin'



import { history } from '../history'

const Routes = () => (
        <Router history={history}>
                <Switch>
                        <Route component={Login} exact path="/login"/>
                        <Route component={Registro} exact path="/registro"/>
                        <PrivateRoute component={Song} exact path="/song"/>
                        <PrivateRoute component={Home} exact path="/"/>
                        <PrivateRouteAdmin  component={Post} exact path="/post"/>
                        <PrivateRoute component={NotFound}/>
                </Switch>
        </Router>
)




      export default Routes;