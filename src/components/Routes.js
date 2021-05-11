import React from 'react'

import { Router, Switch, Route } from 'react-router'
import Login from '../pages/login'
import Registro from '../pages/registro'
import Home from '../pages/home'
import NotFound from '../components/NotFound'
import PrivateRoute from './PrivateRoute'
import consultamusica from '../consultaMusica/view/consultamusica'

import { history } from '../history'

const Routes = () => (
        <Router history={history}>
                <Switch>
                        <Route component={Login} exact path="/login"/>
                        <Route component={Registro} exact path="/registro"/>
                        <PrivateRoute component={consultamusica} exact path="/"/>
                        <PrivateRoute component={NotFound}/>
                </Switch>
        </Router>
)

export default Routes