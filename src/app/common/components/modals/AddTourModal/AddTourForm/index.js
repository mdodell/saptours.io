import React from 'react';
import { Form, Field } from 'formik';
import { Row, Col, Button } from 'antd';
import {AntDatePicker, AntInputNumber, AntSelect, AntTextArea, AntTimePicker} from "../../../form/AntFormik";
import {TOUR_TYPES} from "../../../../constants";

export const AddTourForm = () => {
    return (
        <Form>
            <Row type="flex" justify="space-between">
                <Col span={7}>
                    <Field
                        label="Tour Type"
                        placeholder="Admissions Tour, Group Visit..."
                        name="eventType"
                        component={AntSelect}
                        selectOptions={TOUR_TYPES}
                    />
                </Col>
                <Col span={7}>
                    <Field
                        component={AntDatePicker}
                        name="date"
                        placeholder="Date"
                        label="Start Date"
                        format="MM-DD-YYYY"
                    />
                </Col>
                <Col span={7}>
                    <Field
                        component={AntTimePicker}
                        name="time"
                        placeholder="Time"
                        label="Time"
                        format="h:mm a"
                        minuteStep={60}
                        use12Hours
                    />
                </Col>
                <Col span={7}>
                    <Field
                        component={AntInputNumber}
                        name="repeatFor"
                        placeholder="0, 1, 3"
                        label="Repeat for (weeks)"
                    />
                </Col>
                <Col span={7}>
                    <Field
                        component={AntInputNumber}
                        name="numberOfGuides"
                        placeholder="0, 1, 3"
                        label="Guides needed"
                    />
                </Col>
                <Col span={7}>
                </Col>
                <Col span={24}>
                    <Field
                        component={AntTextArea}
                        name="description"
                        placeholder="Write up a little bit about the tour..."
                        label="Description"
                        type="description"
                        rows={4}
                    />
                </Col>
                <Col span={24} style={styles.formRowStyle}>
                    <Row type="flex" justify="end">
                        <Button htmlType="submit" type="primary">Add Tour</Button>
                    </Row>
                </Col>
            </Row>
        </Form>
    )
};

const styles = {
    formRowStyle: {
        marginTop: '1em'
    }
};

