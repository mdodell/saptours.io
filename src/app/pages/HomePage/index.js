import React, { useState } from 'react';
import {Button, Icon, Row, Col, Typography} from "antd";

const { Title } = Typography;

const HomePage = ({history}) => {
    const [hover, toggleHover] = useState(true);
    return (
        <Row
            type="flex"
            justify="center"
            align="middle"
            style={styles.rowStyle}
        >
            <Col>
                <div style={styles.centerColumn}>
                    <Title style={styles.whiteText}><Icon type="bank" />saptours.io</Title>
                    <Button
                        type="text-color-inverse"
                        ghost={hover}
                        size="large"
                        onClick={() => history.push('/login')}
                        onMouseEnter={() => toggleHover(!hover)}
                        onMouseLeave={() => toggleHover(!hover)}
                    >
                        Get Started
                        <Icon type="right" />
                    </Button>
                </div>
            </Col>
        </Row>
    );
};

const styles = {
    rowStyle: {
        height: '100vh',
        backgroundImage: 'linear-gradient(to bottom right, #002E6C, blue, dodgerblue, aliceblue'
    },
    whiteText: {
        color: 'white'
    },
    centerColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default HomePage;
