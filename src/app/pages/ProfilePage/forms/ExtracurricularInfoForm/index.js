import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { Form, Field } from 'formik';
import {AntSelect, AntTextArea} from "../../../../common/components/form/AntFormik";
import {CLUBS_LIST} from "../../../../common/constants";

const { Title } = Typography;

const ExtracurricularInfoForm = () => {
    return (
        <Form>
            <Row type="flex" justify="space-between">
                <Col span={24}>
                    <Title level={4}>Extracurricular Information</Title>
                </Col>
                <Col span={24}>
                    <Field
                        label="Athletics/Clubs"
                        placeholder="TAMID, BAASA, Hillel..."
                        name="clubs"
                        mode="multiple"
                        component={AntSelect}
                        selectOptions={CLUBS_LIST}
                    />
                </Col>
                <Col span={10}>
                    <Field
                        label="Jobs"
                        placeholder="Sound and Image Media Studios, Library Help Desk..."
                        type="jobs"
                        name="jobs"
                        component={AntTextArea}
                        rows={4}
                    />
                </Col>
                <Col span={10}>
                    <Field
                        label="Research"
                        placeholder="Alterman Lab, Goode Lab, Western Jihadism Project.."
                        type="research"
                        name="research"
                        component={AntTextArea}
                        rows={4}
                    />
                </Col>
                <Col span={24}>
                    <Field
                        label="Internships/Study Abroad"
                        placeholder="DICK's Sporting Goods, EMD Serono, Disney, Brandeis in Copenhagen: Business and Economics in Denmark..."
                        type="internships"
                        name="internships"
                        component={AntTextArea}
                        rows={6}
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

export default ExtracurricularInfoForm;
