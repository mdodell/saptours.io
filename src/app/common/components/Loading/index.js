import React from 'react';
import {Row, Typography, Icon} from 'antd';

const { Title } = Typography;

const Loading = () => {
    return (
        <Row style={styles.fullPage} type="flex" align="middle" justify="center">
            <Title style={styles.titleStyle}>Loading</Title>
            <Icon type="loading" style={styles.iconStyle} />
        </Row>
    );
};

const styles = {
    fullPage: {
        height: '100vh',
        width: '100vw',
        flexDirection: 'column',
        backgroundImage: 'linear-gradient(to bottom right, #002E6C, blue, dodgerblue, aliceblue'
    },
    iconStyle: {
        color: 'white',
        fontSize: '4em'
    },
    titleStyle: {
        color: 'white'
    }
};

export default Loading;
