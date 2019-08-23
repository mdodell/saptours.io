import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Layout, Row, Col, Typography, Icon} from 'antd';
import SignedOutMenu from "./components/SignedOutMenu";
import SignedInMenu from "./components/SignedInMenu";
import {withFirebase} from "react-redux-firebase";
import {withRouter} from "react-router-dom";
import { HOME_ROUTE} from "../../constants";
import { login } from '../../../redux/auth/authActions';
import { isMobileOnly } from 'react-device-detect';

const { Title } = Typography;

const mapDispatchToProps = dispatch => {
    return {
        loginUser: (creds) => dispatch(login(creds))
    }
};

const mapStateToProps = (state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile
});

class NavBar extends Component {
    handleSignOut = () =>{
        this.props.firebase.logout();
        this.props.history.push(HOME_ROUTE);
    };

    handleLogin = (formValues) => {
        this.props.loginUser(formValues);
    };

    render(){
        const { auth, profile } = this.props;
        const authenticated = auth.isLoaded && !auth.isEmpty;
        return (
            <Layout>
            <Layout.Header style={styles.headerPadding}>
                <Row type="flex" align="middle" style={styles.rowStyle} justify="space-between">
                    <Col>
                        <Title level={2} style={styles.appText}><Icon type="bank" style={styles.iconPadding}/>saptours.io</Title>
                    </Col>
                    {!isMobileOnly && <Col>
                        {authenticated ? <SignedInMenu profile={profile} auth={auth} signOut={this.handleSignOut}/> : <SignedOutMenu handleLogin={this.handleLogin}/>}
                    </Col>}
                </Row>
            </Layout.Header>
            </Layout>
        );
    }
};

const styles = {
    headerPadding: {
        padding: '0 25px',
        alignItems: 'center'
    },
    appText: {
        color: 'white',
        marginBottom: '0',
        float: 'left'
    },
    iconPadding: {
        marginRight: '0.25em'
    },
    rowStyle: {
        height: '100%'
    }
};

export default withRouter(withFirebase(connect(mapStateToProps, mapDispatchToProps)(NavBar)));
