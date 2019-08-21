import React, {Component, useState} from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Link, withRouter} from "react-router-dom";
import {DASHBOARD_CALENDAR_ROUTE, DASHBOARD_ROUTE, PROFILE_ROUTE, USER_TABLE_ROUTE} from "../../constants";
import { compose } from 'redux';
import {firebaseConnect} from "react-redux-firebase";
import moment from "moment";

const {Sider} = Layout;

const getSelectedMenuItem = ({pathname}) => {
    if(pathname.startsWith(DASHBOARD_CALENDAR_ROUTE)){
        return DASHBOARD_ROUTE;
    } else if(pathname.startsWith(USER_TABLE_ROUTE)) {
        return USER_TABLE_ROUTE
    } else if(pathname.startsWith(PROFILE_ROUTE)){
        return PROFILE_ROUTE
    }
};

const SideNav = ({firebase, location}) => {
    const [collapsed, onCollapse] = useState(false);
    return (
            <Sider theme="light" collapsible collapsed={collapsed} onCollapse={() => onCollapse(!collapsed)}>
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" selectedKeys={[getSelectedMenuItem(location)]}
                >
                    <Menu.Item key={DASHBOARD_ROUTE}>
                        <Link to={`${DASHBOARD_CALENDAR_ROUTE}/${moment().startOf('month').format('YYYY-MM-DD')}/${moment().endOf('month').format('YYYY-MM-DD')}`}>
                                <Icon type="calendar" />
                                <span>Tour Calendar</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={USER_TABLE_ROUTE}>
                        <Link to={USER_TABLE_ROUTE}>
                                <Icon type="user"/>
                                <span>Guide List</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={PROFILE_ROUTE}>
                        <Link to={`${PROFILE_ROUTE}/${firebase.auth().currentUser.uid}`}>
                            <Icon type="profile"/>
                            <span>Profile Page</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    };

export default compose(
    withRouter,
    firebaseConnect()
)(SideNav);