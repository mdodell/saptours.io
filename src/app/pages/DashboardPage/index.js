import React from 'react';
import {UserIsAuthenticated} from "../../common/utils/authentication";

const DashboardPage = () => {
    return (
        <h1>DashboardPage</h1>
    );
};

export default UserIsAuthenticated(DashboardPage);
