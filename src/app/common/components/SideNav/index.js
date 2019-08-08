import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Link, withRouter} from "react-router-dom";
import {DASHBOARD_CALENDAR_ROUTE, PROFILE_ROUTE, USER_TABLE_ROUTE} from "../../constants";
import { compose } from 'redux';
import {firebaseConnect} from "react-redux-firebase";

const {Sider} = Layout;

class SideNav extends Component {
    state = {
        collapsed: false
    };

    onCollapse = () => {
        this.setState({collapsed: !this.state.collapsed});
    };

    render(){
        const { location, firebase } = this.props;
        const { collapsed } = this.state;
        return (
            <Sider theme="light" collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <Menu theme="light" defaultSelectedKeys={['1']} selectedKeys={[location.pathname]} mode="inline">
                    <Menu.Item key={DASHBOARD_CALENDAR_ROUTE}>
                        <Link to={DASHBOARD_CALENDAR_ROUTE}>
                            <Icon type="calendar"/>
                            <span>Tour Calendar</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={USER_TABLE_ROUTE}>
                        <Link to={USER_TABLE_ROUTE}>
                            <Icon type="user"/>
                            <span>Guide List</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={`${PROFILE_ROUTE}/${firebase.auth().currentUser.uid}`}>
                        <Link to={`${PROFILE_ROUTE}/${firebase.auth().currentUser.uid}`}>
                            <Icon type="profile"/>
                            <span>Profile Page</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default compose(
    withRouter,
    firebaseConnect()
)(SideNav);