import React from 'react';
import { Col, Result, Typography, Button, Icon } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import {DefinedRow} from "../../common/components/styled";
import {isMobileOnly} from "react-device-detect";
import { Formik } from 'formik';
import * as yup from "yup";
import {updatePassword} from "../../redux/auth/authActions";
import UpdatePasswordForm from "./UpdatePasswordForm";

const { Paragraph, Text } = Typography;

const mapDispatchToProps = {
    updatePassword
};

const validationSchema = yup.object().shape({
    oldPassword: yup.string().required('Required'),
    newPassword: yup.string().required('Required!').min(6, 'Please try a longer password...'),
    confirmPassword: yup.string().required('Required!').test('passwords-match', 'Passwords must match!', function(value) {
        return this.parent.newPassword === value
    }),
});

const UpdatePasswordPage = ({history, messages, location, status = "404", updatePassword}) => {
    return (
        <DefinedRow width="100vw" height="calc(100vh - 64px)" type="flex" align="middle" justify="center">
            <Col span={24}>
                <Result
                    status={status}
                    title="Want to change your password?"
                    subTitle="Fill out the form below to change it!"
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
                                <Formik validationSchema={validationSchema} render={UpdatePasswordForm} onSubmit={formProps => updatePassword(formProps)}/>
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
)(UpdatePasswordPage);

