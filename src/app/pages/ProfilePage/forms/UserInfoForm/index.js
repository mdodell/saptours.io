import React from 'react';
import {Field, Form} from "formik";
import {Row, Col, Icon, Typography, Button} from 'antd';
import {AntDatePicker, AntInput, AntInputNumber, AntSelect} from "../../../../common/components/form/AntFormik";
import {CHATTER, DIETARY_RESTRICTIONS, HOST, STATES, TOUR_GUIDE} from "../../../../common/constants";
const { Title } = Typography;

const UserInfoForm = () => {
    return (
        <Form>
            <Row type="flex" justify="space-between">
                <Col span={24}>
                    <Title level={4}>Personal Information</Title>
                </Col>
                <Col span={7}>
                    <Field
                        component={AntInput}
                        name="fullName"
                        type="fullName"
                        placeholder="Full Name"
                        label="Full Name"
                    />
                </Col>
                <Col span={7}>
                    <Field
                        component={AntDatePicker}
                        name="birthday"
                        placeholder="Birthday"
                        label="Birthday"
                        format="MM-DD-YYYY"
                    />
                </Col>
                <Col span={7}>
                    <Field
                        component={AntInput}
                        name="phoneNumber"
                        type="phoneNumber"
                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="0123456789"
                        label="Phone Number"
                    />
                </Col>
                <Col span={7}>
                    <Field
                        component={AntInput}
                        name="city"
                        type="city"
                        placeholder="Scottsdale, New York City, Los Angeles..."
                        label="Home City"
                    />
                </Col>
                <Col span={7}>
                    <Field
                        component={AntSelect}
                        name="state"
                        label="Home State"
                        selectOptions={STATES}
                    />
                </Col>
                <Col span={7}>
                    <Field
                        component={AntInput}
                        name="highSchool"
                        type="highSchool"
                        placeholder="High School"
                        label="High School"
                    />
                </Col>
                <Col span={24}>
                    <Field
                        name="dietaryRestrictions"
                        label="Dietary Restrictions (not preferences):"
                        mode="multiple"
                        component={AntSelect}
                        selectOptions={DIETARY_RESTRICTIONS}
                    />
                </Col>
                <Col span={24}>
                    <Title level={4} style={{marginTop: '1em'}}>Admissions Information</Title>
                </Col>
                <Col span={7}>
                    <Field
                        name="minTours"
                        placeholder="0"
                        label="Minimum tours per month"
                        component={AntInputNumber}
                    />
                </Col>
                <Col span={7}>
                    <Field
                        name="maxTours"
                        placeholder="0"
                        label="Maximum tours per month"
                        component={AntInputNumber}
                    />
                </Col>
                <Col span={7}>
                    <Field
                        name="activeStatus"
                        label="Are you an active Admissions volunteer?"
                        component={AntSelect}
                        selectOptions={["Yes", "No"]}
                    />
                </Col>
                <Col span={7}>
                    <Field
                        name="flexibility"
                        label="Can you be assigned more/less tours?"
                        component={AntSelect}
                        selectOptions={["Yes", "No"]}
                    />
                </Col>
                <Col span={7}>
                    <Field
                        label="Role(s)"
                        name="roles"
                        mode="multiple"
                        component={AntSelect}
                        selectOptions={[TOUR_GUIDE, CHATTER, HOST]}
                    />
                </Col>
                <Col span={7}></Col>
                <Col span={24}>
                    <Button type="primary" style={styles.buttonStyle} htmlType="submit">Submit Info</Button>
                </Col>
            </Row>
        </Form>
    );
};

const styles = {
    buttonStyle: {
        marginTop: '2em'
    }
};

export default UserInfoForm;
