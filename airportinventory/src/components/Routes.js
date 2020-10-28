import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import LoginForm from "./login";
import history from './history';
import DashBoard from "./Dashboard"


export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={LoginForm} />
                    <Route path="/dashboard/:name" component={DashBoard} />
                </Switch>
            </Router>
        )
    }
}