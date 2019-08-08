import React from 'react';
import { Form, Field} from 'formik';
import { Row, Col, Typography, Button } from 'antd';
import { AntSelect, AntTextArea } from "../../../../common/components/form/AntFormik";
import { DECISION_TYPES, MAJOR_LIST, MINOR_LIST } from "../../../../common/constants";

const { Title } = Typography;

const getGraduationYears = () => {
    const currentYear = new Date().getFullYear();
    let graduationYears = [currentYear];
    for(let i = 1; i <= 4; i++) {
        graduationYears.push(currentYear + i);
    }
    return graduationYears;
};

const AcademicInfoForm = () => {
    return (
        <Form>
            <Row type="flex" justify="space-between">
                <Col span={24}>
                    <Title level={4}>Personal Information</Title>
                </Col>
                <Col span={10}>
                    <Field
                        label="Major(s)"
                        placeholder="Computer Science, History, Hispanic Studies..."
                        name="majors"
                        mode="multiple"
                        component={AntSelect}
                        selectOptions={MAJOR_LIST}
                    />
                </Col>
                <Col span={10}>
                    <Field
                        label="Minor(s)"
                        placeholder="Studio Art, History of Ideas, Religious Studies..."
                        name="minors"
                        mode="multiple"
                        component={AntSelect}
                        selectOptions={MINOR_LIST}
                    />
                </Col>
                <Col span={10}>
                    <Field
                        name="graduationYear"
                        label="Graduation Year"
                        component={AntSelect}
                        selectOptions={getGraduationYears()}
                    />
                </Col>
                <Col span={10}>
                    <Field
                        label="Decision Type"
                        mode="multiple"
                        placeholder="Regular Decision, Legacy..."
                        name="decisionType"
                        component={AntSelect}
                        selectOptions={DECISION_TYPES}
                    />
                </Col>
                <Col span={24}>
                    <Field
                        rows={8}
                        type="postGraduationPlans"
                        placeholder="Tell us about what you want to do/are planning to do after you graduate Brandeis!"
                        label="Post-Graduation Plans"
                        name="postGraduationPlans"
                        component={AntTextArea}
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

export default AcademicInfoForm;
