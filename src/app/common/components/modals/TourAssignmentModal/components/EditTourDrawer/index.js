import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Drawer } from 'antd';
import {Formik} from 'formik';
import * as yup from "yup";
import moment from "moment/moment";
import {TOUR_TYPES} from "../../../../../constants";
import EditTourForm from "../../Forms/EditTourForm";
import {updateTour} from "../../../../../../redux/tours/tourActions";
import withWindowDimensions from "../../../../../utils/withWindowDimensions";

const mapDispatchToProps = {
    updateTour
};

const mapStateToProps = (state) => {
    return {
        tours: state.firestore.ordered.tours
    }
};

const validationSchema = yup.object().shape({
    eventType: yup.string().required('Required!'),
    date: yup.string().required('Required').nullable(),
    time: yup.string().required('Required').nullable(),
    repeatFor: yup.number().typeError('Must be a number!').min(0, 'You cannot repeat an event a negative number of times!'),
    numberOfGuides:  yup.number().typeError('This field must be a number!').min(1, 'You must have at least one guide!').required('Required!'),
    description: yup.string()
});

const EditTourDrawer = ({toggleDrawer, visible, title, tour, onOk, updateTour, tours, windowWidth}) => {

    const initialValues = {
        eventType: tour.eventType || TOUR_TYPES[0],
        date: moment(new Date(tour.date.seconds * 1000)) || moment(new Date()),
        time: moment().hour(moment(new Date(tour.date.seconds * 1000)).hour()).minute(moment(new Date(tour.date.seconds * 1000)).minute()).seconds(moment(new Date(tour.date.seconds * 1000)).seconds()) || moment().hour(6).minute(0).second(0),
        numberOfGuides: tour.numberOfGuidesRequested || 0,
        description: tour.description || '',
        guides: tour.assignedGuideIds || []
    };
    return (
        <Drawer
            title={title}
            placement="right"
            closable
            onClose={() => {
                toggleDrawer();
            }}
            visible={visible}
            width={windowWidth/2}
        >
            <Formik enableReinitiailize initialValues={initialValues} validationSchema={validationSchema} onOk={onOk}
                    onSubmit={(formProps, {resetForm}) => {
                updateTour(formProps, tour);
                resetForm();
                toggleDrawer();
                onOk();
            }} render={() => <EditTourForm tour={tour} tours={tours} onOk={onOk}/>} />
        </Drawer>
    );
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withWindowDimensions
    )(EditTourDrawer);
