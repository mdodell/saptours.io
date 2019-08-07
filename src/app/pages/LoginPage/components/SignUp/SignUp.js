import React from 'react';
import { Row, Col, Button } from 'antd';
import { Field, Form } from "formik";
import { AntInput, AntPassword, AntSelect } from "../../../../common/components/form/AntFormik";
import {TOUR_GUIDE, CHATTER, HOST} from "../../../../common/constants";

const SignUp = ({ initialValues }) => {
    return (
            <Row gutter={16}>
                <Form>
                    <Col span={12}>
                    <Field
                        component={AntInput}
                        name="firstName"
                        type="firstName"
                        placeholder="First Name"
                        hasFeedback
                    />
                    </Col>
                    <Col span={12}>
                        <Field
                            component={AntInput}
                            name="lastName"
                            type="lastName"
                            placeholder="Last Name"
                            hasFeedback
                        />
                    </Col>
                    <Col span={24}>
                        <Field
                            component={AntInput}
                            name="email"
                            type="email"
                            placeholder="Email"
                            hasFeedback
                        />
                    </Col>
                    <Col span={24}>
                        <Field
                            component={AntPassword}
                            name="passwordOne"
                            type="passwordOne"
                            placeholder="New Password"
                            hasFeedback
                        />
                    </Col>
                    <Col span={24}>
                        <Field
                            component={AntPassword}
                            name="passwordTwo"
                            type="passwordTwo"
                            placeholder="Confirm Password"
                            hasFeedback
                        />
                    </Col>
                    <Col span={24}>
                        <Field
                            name="role"
                            mode="multiple"
                            component={AntSelect}
                            defaultValue={initialValues.role}
                            selectOptions={[TOUR_GUIDE, CHATTER, HOST]}
                            hasFeedback
                        />
                    </Col>
                    <Col span={24}>
                        <Button style={styles.buttonStyle} type="primary" htmlType="submit">Sign Up</Button>
                    </Col>
                </Form>
            </Row>
    );
};

const styles = {
    buttonStyle: {
        marginTop: '2em'
    }
};

export default SignUp;