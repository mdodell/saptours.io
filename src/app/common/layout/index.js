import React, { Component, Fragment } from 'react';
import {Route, Switch, withRouter } from "react-router-dom";
import {HOME_ROUTE, LOGIN_ROUTE, DASHBOARD_ROUTE, ERROR_ROUTE} from '../constants';
import HomePage from "../../pages/HomePage";
import ErrorPage from "../../pages/ErrorPage";
import DashboardPage from "../../pages/DashboardPage";
import LoginPage from "../../pages/LoginPage";
import NavBar from '../components/NavBar';

class App extends Component {
    render() {
        return (
            <Fragment>
                <Route exact path={HOME_ROUTE} component={HomePage} />
                <Route
                    path="/(.+)"
                    render={() => (
                        <Fragment>
                            <NavBar />
                                <Switch key={this.props.location.key}>
                                    <Route path={LOGIN_ROUTE} component={LoginPage} />
                                    <Route path={DASHBOARD_ROUTE} component={DashboardPage} />
                                    <Route path={ERROR_ROUTE} render={() => <ErrorPage message="No login page has been made!"/>} />
                                </Switch>
                        </Fragment>
                    )}
                />
            </Fragment>
        );
    }
}

export default withRouter(App);
