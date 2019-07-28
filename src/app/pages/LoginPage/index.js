import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon, Typography } from 'antd';
import SignUp from "./components/SignUp/SignUp";
import {Formik} from "formik";
import * as yup from 'yup';
import {registerUser} from "../../redux/auth/authActions";
import {UserIsNotAuthenticated} from "../../common/utils/authentication";

const { Title } = Typography;

const mapDispatchToProps = {
    registerUser
};

const mapStateToProps = (state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile
});

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    role: ['Tour Guide']
};


const validationSchema = yup.object().shape({
    firstName: yup.string().required('Required!'),
    lastName: yup.string().required('Required!'),
    email: yup.string().email('Must be a valid email!').required('Required!'),
    passwordOne: yup.string().required('Required!').min(6, 'Please try a longer password...'),
    passwordTwo: yup.string().required('Required!').test('passwords-match', 'Passwords must match!', function(value) {
        return this.parent.passwordOne === value
    }),
    role: yup.array().min(1, 'You must have at least one role!')
});

const LoginPage = ({registerUser}) => {
    return (
        <Row type="flex" justify="center" align="middle" style={styles.pageHeight}>
            <Col span={14}>
                <Row type="flex" justify="center" align="middle">
                    <Icon type="bank" style={{fontSize: '18em'}}/>
                </Row>
            </Col>
            <Col span={8}>
                <Row type="flex" justify="center" align="middle">
                    <Col span={24}>
                        <Title level={4}>Don't have an account?</Title>
                    </Col>
                    <Col span={24}>
                        <Title level={1}>Sign Up</Title>
                    </Col>
                    <Formik render={SignUp} initialValues={initialValues} onSubmit={formProps => registerUser(formProps)} validationSchema={validationSchema}/>
                </Row>
            </Col>
        </Row>
    );
};

const styles={
    pageHeight: {
        height: 'calc(100vh - 64px)'
    }
};

export default UserIsNotAuthenticated(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
