import React from 'react';
import { connect } from 'react-redux';
import {Form, Field} from 'formik';
import { Row, Col, Button } from 'antd';
import {AntDatePicker, AntSelect, AntTimePicker, AntInputNumber, AntTextArea} from "../../../../form/AntFormik";
import {TOUR_TYPES} from "../../../../../constants";
import {deleteTour} from "../../../../../../redux/tours/tourActions";
import {numberOfToursInMonth} from "../../../../../utils/calendarUtils";

const mapDispatchToProps = {
    deleteTour
}

const EditTourForm = ({tour, deleteTour, onOk, tours}) => {

    const tourGuideSelect = (tour, tours) => {
        let tourSelectOptions = [];
        tour.availableGuides.forEach(guide => {
            tourSelectOptions.push({key: guide.id, label: `${guide.user.fullName} - Assigned: ${numberOfToursInMonth(tours, guide.id)}, Min: ${guide.user.tourAvailability.minTours}, Max: ${guide.user.tourAvailability.maxTours}, Flexible: ${guide.user.tourAvailability.flexibility ? 'Yes' : 'No'}`});
        });
        tour.assignedGuides.forEach(guide => {
           if(!tourSelectOptions.some(e => e.key === guide.id)){
               tourSelectOptions.push({key: guide.id, label: `${guide.user.fullName} - Assigned: ${numberOfToursInMonth(tours, guide.id)}, Min: ${guide.user.tourAvailability.minTours}, Max: ${guide.user.tourAvailability.maxTours}, Flexible: ${guide.user.tourAvailability.flexibility ? 'Yes' : 'No'}`});
           }
        });
        return tourSelectOptions;
    };

    return (
        <Form>
            <Row type="flex" justify="space-between">
                <Col span={24}>
                    <Field
                        label="Tour Type"
                        placeholder="Admissions Tour, Group Visit..."
                        name="eventType"
                        component={AntSelect}
                        selectOptions={TOUR_TYPES}
                    />
                </Col>
                <Col span={24}>
                    <Field
                        component={AntDatePicker}
                        name="date"
                        placeholder="Date"
                        label="Start Date"
                        format="MM-DD-YYYY"
                    />
                </Col>
                <Col span={24}>
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
                <Col span={24}>
                    <Field
                        component={AntInputNumber}
                        name="numberOfGuides"
                        placeholder="0, 1, 3"
                        label="Guides needed"
                    />
                </Col>
                <Col span={24}>
                    <Field
                        label="Guides"
                        placeholder="Bob Smith, Jane Doe..."
                        name="guides"
                        component={AntSelect}
                        mode="multiple"
                        selectOptions={tourGuideSelect(tour, tours)}
                    />
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
                    <Row type="flex" justify="end" gutter={16}>
                        <Col>
                            <Button type="danger" icon="delete" onClick={() => {
                                deleteTour(tour);
                                onOk();
                            }}>Delete Tour</Button>
                        </Col>
                        <Col>
                            <Button htmlType="submit" type="primary" icon="edit">Edit Tour</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
};

const styles = {
    formRowStyle: {
        marginTop: '1em'
    }
};


export default connect(null, mapDispatchToProps)(EditTourForm);
