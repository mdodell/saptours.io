import React, { Fragment } from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import {
    HOME_ROUTE,
    LOGIN_ROUTE,
    DASHBOARD_ROUTE,
    ERROR_ROUTE,
    FORGOT_PASSWORD_ROUTE, UPDATE_PASSWORD_ROUTE
} from '../constants';
import HomePage from "../../pages/HomePage";
import ErrorPage from "../../pages/ErrorPage";
import DashboardPage from "../../pages/DashboardPage";
import LoginPage from "../../pages/LoginPage";
import NavBar from '../components/NavBar';
import { isMobileOnly } from "react-device-detect";
import {UserIsAuthenticated, UserIsNotAuthenticated} from "../utils/authentication";
import moment from 'moment-timezone';
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
import UpdatePasswordPage from "../../pages/UpdatePasswordPage";

moment.tz.setDefault("America/New_York");

const App = ({location}) => {
    return (
        <Fragment>
            <Route exact path={HOME_ROUTE} component={HomePage}/>
            <Route
                path="/(.+)"
                render={() => (
                    <Fragment>
                        <NavBar/>
                        <Switch key={location.key}>
                            <Route exact path={LOGIN_ROUTE} component={UserIsNotAuthenticated(LoginPage)}/>
                            <Route exact path={UPDATE_PASSWORD_ROUTE} component={UserIsAuthenticated(UpdatePasswordPage)} />
                            <Route exact path={FORGOT_PASSWORD_ROUTE} component={UserIsNotAuthenticated(ForgotPasswordPage)} />
                            <Route strict path={DASHBOARD_ROUTE} component={UserIsAuthenticated(DashboardPage)}/>
                            <Route exact path={ERROR_ROUTE} component={ErrorPage}/>
                            <Route component={() => <ErrorPage messages={["This page does not exist!"]}/>}/>
                        </Switch>
                    </Fragment>
                )}
            />
            {isMobileOnly && <Redirect to={{
                pathname: ERROR_ROUTE,
                state: {messages: ["This website is not friendly on mobile!"]}
            }}/>}
        </Fragment>
    );
}


export default withRouter(App);
