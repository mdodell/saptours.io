import React from 'react';
import {Form, Field} from 'formik';
import {Row, Col, Button, Icon} from 'antd';
import {AntSelect} from "../../../../../common/components/form/AntFormik";
import {AND_QUERY, DECISION_TYPES, MAJOR_LIST, MINOR_LIST, OR_QUERY, STATES} from "../../../../../common/constants";

const UserTableFilterForm = ({resetForm}) => {
    return (
        <Form style={styles.formContainer}>
            <Row type="flex" justify="space-between">
                <Col span={7}>
                    <Field
                        label="Major(s)"
                        placeholder="Computer Science, History, Hispanic Studies..."
                        name="majors"
                        mode="multiple"
                        component={AntSelect}
                        selectOptions={MAJOR_LIST}
                    />
                </Col>
                <Col span={7}>
                    <Field
                        label="Minor(s)"
                        placeholder="Studio Art, History of Ideas, Religious Studies..."
                        name="minors"
                        mode="multiple"
                        component={AntSelect}
                        selectOptions={MINOR_LIST}
                    />
                </Col>
                <Col span={7}>
                    <Field
                        label="Decision Type"
                        mode="multiple"
                        placeholder="Regular Decision, Legacy..."
                        name="decisionType"
                        component={AntSelect}
                        selectOptions={DECISION_TYPES}
                    />
                </Col>
                <Col span={7}>
                    <Field
                        component={AntSelect}
                        name="state"
                        label="Home State"
                        placeholder="Massachusetts, Arizona, New York..."
                        selectOptions={STATES}
                    />
                </Col>
                <Col span={24}>
                    <Row type="flex" justify="end" align="middle">
                            <Row type="flex" style={styles.marginTop}>
                                <Button type="danger" style={styles.marginRight} onClick={() => resetForm()} htmlType="submit">Reset Filters <Icon type="delete" /></Button>
                            </Row>
                            <Row type="flex" style={styles.marginTop}>
                                <Button type="primary" htmlType="submit" style={styles.marginRight}>Filter Users<Icon type="filter" /></Button>
                            </Row>
                            <Row type="flex" align="middle" style={styles.marginTop}>
                                <Field
                                    name="AND"
                                    component={AntSelect}
                                    selectOptions={[AND_QUERY, OR_QUERY]}
                                />
                            </Row>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
};


const styles = {
    marginTop: {
        marginTop: '1em',
    },
    marginRight: {
        marginRight: '1em'
    },
    formContainer: {
        marginBottom: '1em'
    }
};

export default UserTableFilterForm;
