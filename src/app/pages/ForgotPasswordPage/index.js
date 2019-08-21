import React from 'react';
import { Col, Result, Typography, Button, Icon } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import {DefinedRow} from "../../common/components/styled";
import {isMobileOnly} from "react-device-detect";
import { Formik } from 'formik';
import * as yup from "yup";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import {forgotPassword} from "../../redux/auth/authActions";

const { Paragraph, Text } = Typography;

const mapDispatchToProps = {
    forgotPassword
};

const validationSchema = yup.object().shape({
    email: yup.string().matches(new RegExp('^[a-zA-Z0-9.!#$%&’*+\\/=?^_`{|}~-]+@brandeis+(?:\\.edu+)*$'),'Must be a valid brandeis.edu address!').required('Required!'),
});

const ForgotPasswordPage = ({history, messages, location, status = "404", forgotPassword}) => {
    return (
        <DefinedRow width="100vw" height="calc(100vh - 64px)" type="flex" align="middle" justify="center">
            <Col span={24}>
                <Result
                    status={status}
                    title="Forgot your password?"
                    subTitle="Fill out the form below to reset it!"
                    extra={[
                        !isMobileOnly && <Button type="primary" key="back" onClick={() => history.goBack()}>
                            Go back
                            <Icon type="rollback" />
                        </Button>,
                    ]}
                >
                    <div>
                        <Paragraph>
                            <Text
                                strong
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                Please enter your email below to be sent a reset password.
                                <Formik validationSchema={validationSchema} render={ForgotPasswordForm} onSubmit={formProps => forgotPassword(formProps.email)}/>
                            </Text>
                        </Paragraph>

                    </div>
                </Result>
            </Col>
        </DefinedRow>
    );
};

export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
    )(ForgotPasswordPage);
