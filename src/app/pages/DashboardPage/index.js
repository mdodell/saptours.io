import React, {Fragment} from 'react';
import { Layout, Calendar} from 'antd';
import { Redirect, Route, Switch } from "react-router-dom";
import SideNav from "../../common/components/SideNav";
import TourCalendar from "../../common/components/TourCalendar";

const { Header, Content, Footer } = Layout;

const DashboardPage = () => {
    return (
        <Fragment>
            <Layout style={{height: 'calc(100vh - 64px)'}}>
                <SideNav />
                <Layout>
                    <Content style={{ margin: '0 16px' }}>
                        <Switch>
                            <Redirect exact from="/dashboard" to="/dashboard/calendar" />
                            <Route path="/dashboard/calendar" component={TourCalendar} />
                            <Redirect to="/error"/> 
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Fragment>
    );
};

export default DashboardPage;
