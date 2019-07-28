import React from 'react';
import { Menu } from 'antd';

const MenuOptions = ({signOut}) => {
    return (
        <Menu style={{marginTop: '0em'}} theme="dark">
            <Menu.Item>
                <p>
                    1st menu item
                </p>
            </Menu.Item>
            <Menu.Item>
                <p>
                    2nd menu item
                </p>
            </Menu.Item>
            <Menu.Item onClick={signOut}>
                <p>
                    Sign Out
                </p>
            </Menu.Item>
        </Menu>
    );
};

export default MenuOptions;
