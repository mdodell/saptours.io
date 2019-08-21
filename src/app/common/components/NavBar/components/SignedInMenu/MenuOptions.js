import React from 'react';
import { Link } from 'react-router-dom';
import {Icon, Menu} from 'antd';
import {UPDATE_PASSWORD_ROUTE} from "../../../../constants";

const MenuOptions = ({signOut}) => {
    return (
        <Menu style={{marginTop: '0em'}} theme="dark">
            <Menu.Item>
                <Link to={UPDATE_PASSWORD_ROUTE}>
                    <p>
                        <Icon type="setting" /> Change Password
                    </p>
                </Link>
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
