import React from 'react';
import { Form, Field } from 'formik';
import { Row, Col, Button, Typography } from 'antd';
import { TOUR_SHIFTS } from "../../../../common/constants";
import {AntCheckboxGroup} from "../../../../common/components/form/AntFormik";

const { Title } = Typography;

const AvailabilityInfoForm = () => {

    return (
        <Form>
            <Row type="flex" justify="space-between">
                <Col span={24}>
                    <Title level={4}>Personal Information</Title>
                </Col>
                <Col span={24}>
                    <Field
                        label="Monday"
                        name="monday"
                        component={AntCheckboxGroup}
                        options={TOUR_SHIFTS}
                    />
                </Col>
                <Col span={24}>
                    <Field
                        label="Tuesday"
                        name="tuesday"
                        component={AntCheckboxGroup}
                        options={TOUR_SHIFTS}
                    />
                </Col>
                <Col span={24}>
                    <Field
                        label="Wednesday"
                        name="wednesday"
                        component={AntCheckboxGroup}
                        options={TOUR_SHIFTS}
                    />
                </Col>
                <Col span={24}>
                    <Field
                        label="Thursday"
                        name="thursday"
                        component={AntCheckboxGroup}
                        options={TOUR_SHIFTS}
                    />
                </Col>
                <Col span={24}>
                    <Field
                        label="Friday"
                        name="friday"
                        component={AntCheckboxGroup}
                        options={TOUR_SHIFTS}
                    />
                </Col>
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


export default AvailabilityInfoForm;
