import React from 'react';
import { Col, Icon, Typography, Button, Result } from 'antd';
import { DefinedRow } from "../../common/components/styled";
import {HOME_ROUTE} from "../../common/constants";
import { isMobileOnly } from "react-device-detect";
import { withRouter } from "react-router-dom";

const { Paragraph, Text } = Typography;

const renderErrors = (messages) => {
    return messages && messages.map(message =>
        <Paragraph key={message}>
            <Icon style={{ color: 'red' }} type="close-circle" /> { message }
        </Paragraph>
    )
};

const ErrorPage = ({history, messages, location, status = "404"}) => {
    return (
        <DefinedRow width="100vw" height="calc(100vh - 64px)" type="flex" align="middle" justify="center">
            <Col span={24}>
            <Result
                status={status}
                title="You look a little lost..."
                subTitle="Go look for a tour guide to help you get back!"
                extra={[
                    !isMobileOnly && <Button type="primary" key="back" onClick={() => history.push(HOME_ROUTE)}>
                        Go back
                        <Icon type="rollback" />
                    </Button>,
                ]}
            >
                {(messages || location.state) && <div>
                    <Paragraph>
                        <Text
                            strong
                            style={{
                                fontSize: 16,
                            }}
                        >
                            You had the following error:
                        </Text>
                    </Paragraph>
                    {renderErrors(messages || location.state.messages)}
                </div> }
            </Result>
            </Col>
        </DefinedRow>
    );
};

export default withRouter(ErrorPage);
