import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import Loading from '../components/Loading';
import {DASHBOARD_ROUTE, LOGIN_ROUTE} from "../constants"; // change it to your custom component

const locationHelper = locationHelperBuilder({});

export const UserIsAuthenticated = connectedRouterRedirect({
    wrapperDisplayName: 'UserIsAuthenticated',
    AuthenticatingComponent: Loading,
    allowRedirectBack: true,
    redirectPath: (state, ownProps) =>
        locationHelper.getRedirectQueryParam(ownProps) || LOGIN_ROUTE,
    authenticatingSelector: ({ firebase: { auth, profile, isInitializing } }) =>
        !auth.isLoaded || isInitializing === true,
    authenticatedSelector: ({ firebase: { auth } }) =>
        auth.isLoaded && !auth.isEmpty,
    redirectAction: newLoc => (dispatch, {history}) => {
        history.push(LOGIN_ROUTE); // or routerActions.replace
    },
});

export const UserIsNotAuthenticated = connectedRouterRedirect({
    wrapperDisplayName: 'UserIsNotAuthenticated',
    AuthenticatingComponent: Loading,
    allowRedirectBack: false,
    redirectPath: (state, ownProps) =>
        locationHelper.getRedirectQueryParam(ownProps) || DASHBOARD_ROUTE,
    authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
        !auth.isLoaded || isInitializing === true,
    authenticatedSelector: ({ firebase: { auth } }) =>
        auth.isLoaded && auth.isEmpty,
    redirectAction: newLoc => (dispatch, {history}) => {
        history.push(DASHBOARD_ROUTE); // or routerActions.replace// or routerActions.replace
    },
});