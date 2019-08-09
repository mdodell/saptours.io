import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon, Typography } from 'antd';
import SignUp from "./components/SignUp/SignUp";
import {Formik} from "formik";
import * as yup from 'yup';
import {registerUser} from "../../redux/auth/authActions";
import {DefinedRow} from "../../common/components/styled";
import { TOUR_GUIDE } from "../../common/constants";

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
    role: [TOUR_GUIDE]
};


const validationSchema = yup.object().shape({
    firstName: yup.string().required('Required!'),
    lastName: yup.string().required('Required!'),
    email: yup.string().matches(new RegExp('^[a-zA-Z0-9.!#$%&’*+\\/=?^_`{|}~-]+@brandeis+(?:\\.edu+)*$'),'Must be a valid brandeis.edu address!').required('Required!'),
    passwordOne: yup.string().required('Required!').min(6, 'Please try a longer password...'),
    passwordTwo: yup.string().required('Required!').test('passwords-match', 'Passwords must match!', function(value) {
        return this.parent.passwordOne === value
    }),
    role: yup.array()
});

const LoginPage = ({registerUser}) => {
    return (
        <DefinedRow height="calc(100vh - 64px)" type="flex" justify="center" align="middle" gutter={16}>
            <Col span={14}>
                <Row type="flex" justify="center" align="middle">
                    <Icon type="bank" style={{fontSize: '30vw'}}/>
                </Row>
            </Col>
            <Col span={8} xl={10}>
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
        </DefinedRow>
    );
};



export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
