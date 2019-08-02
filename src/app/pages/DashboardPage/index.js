import React, {Fragment} from 'react';
import { Layout } from 'antd';
import { Redirect, Route, Switch } from "react-router-dom";
import SideNav from "../../common/components/SideNav";
import TourCalendar from "./TourCalendar";
import {DASHBOARD_CALENDAR_ROUTE, DASHBOARD_ROUTE, USER_TABLE_ROUTE} from "../../common/constants";
import UserTable from "./UserTable";

const { Content } = Layout;

const DashboardPage = () => {
    return (
        <Fragment>
            <Layout style={{height: 'calc(100vh - 64px)'}}>
                <SideNav />
                <Layout>
                    <Content style={{ margin: '0 16px' }}>
                        <Switch>
                            <Redirect exact from={DASHBOARD_ROUTE} to={DASHBOARD_CALENDAR_ROUTE} />
                            <Route path={DASHBOARD_CALENDAR_ROUTE} component={TourCalendar} />
                            <Route path={USER_TABLE_ROUTE} component={UserTable} />
                            <Redirect to="/error"/> 
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Fragment>
    );
};

export default DashboardPage;
