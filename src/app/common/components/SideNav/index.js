import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import {Link, withRouter} from "react-router-dom";
import {DASHBOARD_CALENDAR_ROUTE, USER_TABLE_ROUTE} from "../../constants";

const { Header, Content, Footer, Sider } = Layout;

class SideNav extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const { location } = this.props;
        return (
                <Sider theme="light" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <Menu theme="light" defaultSelectedKeys={['1']} selectedKeys={[location.pathname]} mode="inline">
                        <Menu.Item key={DASHBOARD_CALENDAR_ROUTE}>
                            <Link to={DASHBOARD_CALENDAR_ROUTE}>
                                <Icon type="calendar" />
                                <span>Tour Calendar</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={USER_TABLE_ROUTE}>
                            <Link to={USER_TABLE_ROUTE}>
                                <Icon type="user" />
                                <span>Guide List</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
        );
    }
}

export default withRouter(SideNav);