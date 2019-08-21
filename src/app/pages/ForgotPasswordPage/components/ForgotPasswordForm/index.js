import React from 'react';
import { Form, Field } from 'formik'
import {AntInput} from "../../../../common/components/form/AntFormik";
import {Button, Icon} from "antd";

const ForgotPasswordForm = () => {
    return (
        <Form>
            <Field
                component={AntInput}
                name="email"
                type="email"
                placeholder="lbrandeis@brandeis.edu"
                label="Email"
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
            <Button type="primary" htmlType="submit" icon="question-circle">Reset Password</Button>
        </Form>
    );
};

export default ForgotPasswordForm;
