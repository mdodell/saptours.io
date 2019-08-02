import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

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
        return (
                <Sider theme="light" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="calendar" />
                            <span>Tour Calendar</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="user" />
                            <span>Guide List</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
        );
    }
}

export default SideNav;