import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Link, withRouter} from "react-router-dom";
import {DASHBOARD_CALENDAR_ROUTE, USER_TABLE_ROUTE} from "../../constants";

const {Sider} = Layout;

class SideNav extends Component {
    state = {
        collapsed: false
    };

    onCollapse = () => {
        this.setState({collapsed: !this.state.collapsed});
    };

    render(){
        const { location } = this.props;
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
                </Menu>
            </Sider>
        );
    }
}

export default withRouter(SideNav);