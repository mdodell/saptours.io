import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import {HOME_ROUTE, LOGIN_ROUTE, DASHBOARD_ROUTE, ERROR_ROUTE, MONTHS} from '../constants';
import HomePage from "../../pages/HomePage";
import ErrorPage from "../../pages/ErrorPage";
import DashboardPage from "../../pages/DashboardPage";
import LoginPage from "../../pages/LoginPage";
import NavBar from '../components/NavBar';
import { isMobileOnly } from "react-device-detect";
import {UserIsAuthenticated, UserIsNotAuthenticated} from "../utils/authentication";
import moment from 'moment-timezone';

moment.tz.setDefault("America/New_York");

class App extends Component {

    render() {
        return (
            <Fragment>
                <Route exact path={HOME_ROUTE} component={HomePage}/>
                <Route
                    path="/(.+)"
                    render={() => (
                        <Fragment>
                            <NavBar/>
                            <Switch key={this.props.location.key}>
                                <Route exact path={LOGIN_ROUTE} component={UserIsNotAuthenticated(LoginPage)}/>
                                <Route strict path={DASHBOARD_ROUTE} component={UserIsAuthenticated(DashboardPage)}/>
                                <Route exact path={ERROR_ROUTE} component={ErrorPage}/>
                            </Switch>
                        </Fragment>
                    )}
                />
                {isMobileOnly && <Redirect to={{
                    pathname: ERROR_ROUTE,
                    state: {messages: ["This website is not friendly on mobile!"]}
                }} /> }
                <Route component={() => <ErrorPage messages={["This page does not exist!"]} />} />
            </Fragment>

        );
    }
}

export default withRouter(App);
