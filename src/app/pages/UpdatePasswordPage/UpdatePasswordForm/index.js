import React from 'react';
import { Form, Field } from 'formik'
import {Button, Icon, Row, Col} from "antd";
import {AntPassword} from "../../../common/components/form/AntFormik";

const UpdatePasswordForm = () => {
    return (
        <Form>
            <Row type="flex" justify="space-between">
                <Col span={7}>
                    <Field
                        component={AntPassword}
                        name="oldPassword"
                        type="oldPassword"
                        placeholder="Old Password"
                        label="Old Password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </Col>
                <Col span={7}>
                    <Field
                        component={AntPassword}
                        name="newPassword"
                        type="newPassword"
                        placeholder="New Password"
                        label="New Password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </Col>
                <Col span={7}>
                    <Field
                        component={AntPassword}
                        name="confirmPassword"
                        type="confirmPassword"
                        placeholder="Confirm Password"
                        label="Confirm Password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </Col>
            </Row>
            <Button style={styles.buttonStyle} type="primary" htmlType="submit" icon="question-circle">Reset Password</Button>
        </Form>
    );
};

const styles = {
    buttonStyle: {
        marginTop: '1em'
    }
}

export default UpdatePasswordForm;