    import React from 'react';
    import { Field, Form } from "formik";
    import {Button } from "antd";
    import { AntInput, AntPassword } from '../../../form/AntFormik';

    const LoginForm = ({handleSubmit }) => {
        return (
            <Form style={{ display: 'flex', alignItems: 'center' }} onSubmit={handleSubmit}>
                <Field
                    style={styles.formItem}
                    component={AntInput}
                    name="email"
                    type="email"
                    placeholder="Email"
                />
                <Field
                    style={styles.formItem}
                    component={AntPassword}
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <Button ghost htmlType="submit">Login</Button>
            </Form>
        );
    };

    const styles = {
        formItem: {
            width: '95%',
        }
    };

    export default LoginForm;

