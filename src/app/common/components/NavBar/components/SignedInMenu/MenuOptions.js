import React from 'react';
import {Icon, Menu} from 'antd';

const MenuOptions = ({signOut}) => {
    return (
        <Menu style={{marginTop: '0em'}} theme="dark">
            <Menu.Item>
                <p>
                    <Icon type="setting" /> Settings
                </p>
            </Menu.Item>
            <Menu.Item onClick={signOut}>
                <p>
                    <Icon type="disconnect" /> Sign Out
                </p>
            </Menu.Item>
        </Menu>
    );
};

export default MenuOptions;
