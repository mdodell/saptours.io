import React, {Fragment} from 'react';
import { Layout } from 'antd';
import { Redirect, Route, Switch } from "react-router-dom";
import SideNav from "../../common/components/SideNav";
import TourCalendar from "./TourCalendar";
import {
    DASHBOARD_CALENDAR_ROUTE, DASHBOARD_CALENDAR_ROUTE_WITH_PARAMS,
    DASHBOARD_ROUTE,
    PROFILE_DISPLAY_ROUTE,
    USER_TABLE_ROUTE
} from "../../common/constants";
import UserTable from "./UserTable";
import ProfilePage from "../ProfilePage";
import moment from 'moment';

const { Content } = Layout;

const DashboardPage = () => {
    return (
        <Fragment>
            <Layout style={{height: 'calc(100vh - 64px)'}}>
                <SideNav  />
                <Layout>
                    <Content style={{ margin: '0 16px' }}>
                        <Switch>
                            <Redirect exact from={DASHBOARD_ROUTE} to={`${DASHBOARD_CALENDAR_ROUTE}/${moment().startOf('month').format('YYYY-MM-DD')}/${moment().endOf('month').format('YYYY-MM-DD')}`} />
                            <Route path={DASHBOARD_CALENDAR_ROUTE_WITH_PARAMS} component={TourCalendar} />
                            <Route path={USER_TABLE_ROUTE} component={UserTable} />
                            <Route path={PROFILE_DISPLAY_ROUTE} component={ProfilePage} />
                            <Redirect to="/error"/> 
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Fragment>
    );
};

export default DashboardPage;
