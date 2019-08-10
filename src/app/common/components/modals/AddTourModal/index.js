import React from 'react';
import { Modal } from 'antd';
import { Formik } from 'formik'
import { AddTourForm } from "./AddTourForm";
import * as yup from "yup";
import {TOUR_TYPES} from "../../../constants";
import moment from 'moment';
import {createTour} from "../../../../redux/tours/tourActions";
import { connect } from 'react-redux';

const mapDispatchToProps = {
    createTour
};

const initialValues = {
    eventType: TOUR_TYPES[0],
    date: moment(new Date()),
    time: moment().hour(11).minute(0).second(0),
    repeatFor: 0,
    numberOfGuides: 0,
    description: ''
};

const validationSchema = yup.object().shape({
    eventType: yup.string().required('Required!'),
    date: yup.string().required('Required').nullable(),
    time: yup.string().required('Required').nullable(),
    repeatFor: yup.number().typeError('Must be a number!').min(0, 'You cannot repeat an event a negative number of times!'),
    numberOfGuides:  yup.number().typeError('Must be a number!').min(1, 'You must have at least one guide!').required(),
    description: yup.string()
});

const AddTourModal = ({onCancel, onOk, tour, visible, createTour}) => {
    return (
        <div>
            <Modal
                title="Add a tour"
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
                footer={null}
                width={620}
            >
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={formProps => {
                    createTour(formProps);
                    onOk();
                }} render={AddTourForm}/>
            </Modal>
        </div>
    );
};

export default connect(null, mapDispatchToProps)(AddTourModal);