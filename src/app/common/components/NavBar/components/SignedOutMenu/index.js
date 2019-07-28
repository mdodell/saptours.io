import React from 'react';
import { Formik } from 'formik';
import LoginForm from "../LoginForm/index";

const initialValues = {
    email: '',
    password: ''
};

const SignedOutMenu = ({handleLogin}) => {
    return (
        <Formik
            initialValues={initialValues}
            render={LoginForm}
            onSubmit={(formProps) => handleLogin(formProps)}
        />
    );
};

export default SignedOutMenu;
