import React from 'react';
import {Avatar, Typography, Row, Col, Icon, Dropdown } from "antd";
import MenuOptions from "./MenuOptions";
import FeedbackIcon from "../FeedbackIcon"

const { Title } = Typography;

const SignedInMenu = ({profile, signOut, auth}) => {
    return (
        <Row type="flex" align="middle" justify="center">
            <Col>
                <Row type="flex" align="middle" justify="center">
                    <FeedbackIcon />
                    <Avatar size="large" icon="user" src={profile.photoURL} />
                </Row>

            </Col>
            <Dropdown overlay={() => <MenuOptions signOut={signOut} />} trigger={['click']} placement="bottomRight">
                <Row type="flex" align="middle" justify="center">
                    <Col>
                        <Title style={styles.headerStyle} level={4}>{profile.fullName}</Title>
                    </Col>
                    <Col>
                        <Icon style={styles.headerStyle} type="down" />
                    </Col>
                </Row>
            </Dropdown>

        </Row>
    );
};

const styles = {
    headerStyle: {
        color: 'white',
        marginBottom: 0,
        marginLeft: '0.5em',
        cursor: 'pointer'
    }
};

export default SignedInMenu;
