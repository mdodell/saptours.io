import React, { useState } from 'react';
import { Col, Typography, Steps, Icon, Spin } from 'antd';
import { connect } from 'react-redux';
import {DefinedRow, VerticalLine, VerticalLineContainer} from "../../common/components/styled";
import UserInfoForm from "./Forms/UserInfoForm";
import {Formik} from "formik";
import { compose } from 'redux';
import {
    CHATTER,
    ED1,
    ED2,
    HOST, INTERNATIONAL_STUDENT,
    LEGACY_STUDENT, MIDYEAR,
    MKTYP,
    POSSE,
    REGULAR_DECISION,
    TOUR_GUIDE
} from "../../common/constants";
import moment from "moment";
import {academicValidationSchema, extracurricularValidationSchema, userValidationSchema} from "./Forms/schemas";
import {
    updateUserProfileInfo,
    updateUserProfileAcademics,
    updateUserProfileExtracurriculars,
    updateUserProfileAvailability
} from "../../redux/user/userActions";
import AcademicInfoForm from "./Forms/AcademicInfoForm";
import ExtracurricularInfoForm from "./Forms/ExtracurricularInfoForm";
import AvailabilityInfoForm from "./Forms/AvailabilityInfoForm";
import {firestoreConnect} from "react-redux-firebase";
const { Title } = Typography;
const { Step } = Steps;

const mapStateToProps = (state) => ({
    profile: state.firebase.profile,
    tourAvailability: state.firestore.data.tourAvailability
});

const mapDispatchToProps = {
    updateUserProfileInfo,
    updateUserProfileAcademics,
    updateUserProfileExtracurriculars,
    updateUserProfileAvailability
};

const populateRoles = (profileRoles) => {
    let profileRoleTitles = [];
    if (profileRoles.chatter) {
        profileRoleTitles.push(CHATTER);
    }
    if(profileRoles.host){
        profileRoleTitles.push(HOST);
    }
    if(profileRoles.tourGuide){
        profileRoleTitles.push(TOUR_GUIDE);
    }
    return profileRoleTitles;
};

const populateDecisionType = (decisionTypes) => {
    let decisionTypeTitles = [];
    if(decisionTypes.ED1) {
        decisionTypeTitles.push(ED1);
    }
    if(decisionTypes.ED2) {
        decisionTypeTitles.push(ED2);
    }
    if(decisionTypes.regularDecision) {
        decisionTypeTitles.push(REGULAR_DECISION);
    }
    if(decisionTypes.POSSE) {
        decisionTypeTitles.push(POSSE);
    }
    if(decisionTypes.MKTYP) {
        decisionTypeTitles.push(MKTYP);
    }
    if(decisionTypes.legacy) {
        decisionTypeTitles.push(LEGACY_STUDENT);
    }
    if(decisionTypes.midyear) {
        decisionTypeTitles.push(MIDYEAR);
    }
    if(decisionTypes.international) {
        decisionTypeTitles.push(INTERNATIONAL_STUDENT);
    };
    console.log(decisionTypeTitles);
    return decisionTypeTitles;
};

const ProfilePage = ({profile, tourAvailability, updateUserProfileInfo, updateUserProfileAcademics, updateUserProfileExtracurriculars, updateUserProfileAvailability}) => {

    const [count, setStep] = useState(0);

    if(!profile.isLoaded && profile.isEmpty){
        return (
            <DefinedRow type="flex" direction="column" height="100%" width="100%" justify="center" align="middle">
                <Spin size="large" />
                <Title>Loading</Title>
            </DefinedRow>
        )
    }

    const userInitialValues = {
        firstName: profile.fullName.split(' ')[0],
        lastName: profile.fullName.split(' ')[1],
        phoneNumber: profile.phoneNumber || '',
        roles: profile.roles ? populateRoles(profile.roles) : [TOUR_GUIDE],
        birthday: moment(Date.now()),
        city: profile.city || '',
        minTours: profile.tourAvailability ? profile.tourAvailability.minTours : '',
        maxTours: profile.tourAvailability ? profile.tourAvailability.maxTours : '',
        activeStatus: 'Yes'
    };

    const academicInitialValues = {
        majors: profile.majors || [],
        minors: profile.minors || [],
        graduationYear: profile.graduationYear || null,
        postGraduationPlans: profile.graduationPlans || 'hi',
        decisionType: profile.decisionType ? populateDecisionType(profile.decisionType) : []
    };

    const extracurricularInitialValues = {
        clubs: profile.clubs || [],
        internships: profile.internships || '',
        research: profile.research || '',
        jobs: profile.jobs || ''
    };

    const renderCurrentContent = () => {
        switch(count){
            case 0:
                return <Formik enableReinitialize initialValues={userInitialValues} validationSchema={userValidationSchema} onSubmit={(formProps) => updateUserProfileInfo(formProps)} render={UserInfoForm} />;
            case 1:
                return <Formik enableReinitialize initialValues={academicInitialValues} validationSchema={academicValidationSchema} onSubmit={(formProps) => updateUserProfileAcademics(formProps)} render={AcademicInfoForm} />;
            case 2:
                return <Formik enableReinitialize initialValues={extracurricularInitialValues} validationSchema={extracurricularValidationSchema} onSubmit={(formProps) => updateUserProfileExtracurriculars(formProps)} render={ExtracurricularInfoForm} />
            case 3:
                return <Formik onSubmit={(formProps) => updateUserProfileAvailability(formProps)} render={AvailabilityInfoForm} />
        }
    };
    return (
        <DefinedRow height="calc(100vh - 64px)" width="100%" type="flex">
            <Col span={5}>
                Photo here
            </Col>
            <VerticalLineContainer>
                <VerticalLine />
            </VerticalLineContainer>
            <Col span={18}>
                <DefinedRow height="100%" width="100%" type="flex" align="middle" direction="column" style={{marginLeft: '2em'}}>
                    <Col span={24}>
                        <Title level={2}>Profile Page</Title>
                    </Col>
                    <Col span={24}>
                        <Steps current={count}>
                            <Step icon={<Icon type="user" onClick={() => setStep(0)}/>} title="User Info" />
                            <Step icon={<Icon type="book" onClick={() => setStep(1)}/>} title="Academic" />
                            <Step icon={<Icon type="smile" onClick={() => setStep(2)}/>} title="Extracurricular" />
                            <Step icon={<Icon type="clock-circle" onClick={() => setStep(3)}/>} title="Availability" />
                        </Steps>
                    </Col>
                    <Col span={24}>
                        <div style={{
                            marginTop: '1em'
                        }}>{renderCurrentContent()}</div>
                    </Col>
                </DefinedRow>
            </Col>
        </DefinedRow>
    );
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'tourAvailability' },
    ])
)(ProfilePage);
