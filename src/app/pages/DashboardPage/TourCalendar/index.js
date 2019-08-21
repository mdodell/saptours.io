import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {Calendar, Badge, Switch, Row, Col, Typography, Button, Spin, Select, Dropdown, Menu} from 'antd';
import './index.css';
import TourAssignmentModal from "../../../common/components/modals/TourAssignmentModal";
import {DefinedRow} from "../../../common/components/styled";
import {DASHBOARD_CALENDAR_ROUTE, MONTHS} from "../../../common/constants";
import AddTourModal from "../../../common/components/modals/AddTourModal";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {withRouter} from "react-router-dom";
import moment from 'moment';
import {downloadToursToGoogleCalendar, downloadToursToICal} from "../../../common/utils/calendarUtils";

const { Title } = Typography;

const mapStateToProps = (state) => ({
    profile: state.firebase.profile,
    tours: state.firestore.ordered.tours,
    auth: state.firebase.auth
});

class TourCalendar extends Component {

    state = {
        tourAssignmentModalState: false,
        addATourState: false,
        selectedTour: null,
        personalFilter: false,
        coverageFilter: false,
        currentMonth: MONTHS[new Date(this.props.match.params.startTime).getUTCMonth()]
    };

    getListData = (value)=> {
        if(this.props.tours && MONTHS[value.month()] === this.state.currentMonth){
            return this.props.tours.filter((tour) => value.date() === new Date(tour.date.seconds * 1000).getDate() && MONTHS[new Date(tour.date.seconds * 1000).getMonth()] === this.state.currentMonth);
        }
        return [];
    };

    handleTourSelect = (tour) => {
        this.setState({
            tourAssignmentModalState: true,
            selectedTour: tour,
        })
    };

    openModal = (modal) => {
        this.setState({
            [modal]: true
        })
    };

    closeModal = (modal) => {
        this.setState({
            [modal]: false,
            selectedTour: null
        });
    };

    formatTime = (tour) => {
        const hours = new Date(tour.date.seconds * 1000).getHours();
        const minutes = new Date(tour.date.seconds * 1000).getMinutes();
        return `${hours % 12 === 0 ? '12' : hours % 12}:${ minutes < 10 ? minutes + '0' : minutes} ${hours < 12 ? 'am' : 'pm'}`
    };

    formatEventTitle = (tour) => {
        if(tour) {
            return `${this.formatTime(tour)} - ${tour.eventType}`
        }
    };

    dateCellRender = (value) => {
        let listData;
        if(this.state.personalFilter && this.state.coverageFilter){
            listData = this.getListData(value).filter(tour => (tour.assignedGuideIds.includes(this.props.auth.id)) || (tour => tour.assignedGuides.length < tour.numberOfGuidesRequested));
        } else if(this.state.personalFilter) {
            listData = this.getListData(value).filter(tour => tour.assignedGuideIds.includes(this.props.auth.uid))
        } else if(this.state.coverageFilter){
            listData = this.getListData(value).filter(tour => tour.assignedGuideIds.length < tour.numberOfGuidesRequested)
        } else {
            listData = this.getListData(value)
        }
        if(listData.length > 0) {
            return (
                <ul className="events">
                    {listData.map(item => (
                        // This boolean logic will let admins see events in the future that have not been assigned yet. Normal guides cannot see these future events until at least one guide has been assigned to them
                        ((!(
                            this.props.profile.roles &&
                            !this.props.profile.roles.admin
                            && (MONTHS[new Date(item.date.seconds * 1000).getMonth()] !== MONTHS[new Date(Date.now()).getMonth()])
                            && !item.published
                        ) && item.published) || this.props.profile.roles.admin)
                        && <li key={item.id} onClick={(e) => {
                            e.preventDefault();
                            this.handleTourSelect(item)
                        }}>
                            <Badge color={this.getTourBadgeStatus(item)} text={this.formatEventTitle(item)} key={item.id}/>
                        </li>
                    ))}
                </ul>
            );
        }
    };

    getTourBadgeStatus = (item) => {
        if (item.assignedGuides.length < item.numberOfGuidesRequested){
            return "red"
        } else if(item.eventType === "Group Visit") {
            return "gold";
        } else if(item.eventType === "Fall for Brandeis Day"){
            return "geekblue"
        } else {
            return "blue";
        }
    };

    setCurrentMonth = (value) => {
        this.setState({
            currentMonth: MONTHS[value.month()]
        }, this.props.history.push(`${DASHBOARD_CALENDAR_ROUTE}/${value.startOf('month').format('YYYY-MM-DD')}/${value.endOf('month').format('YYYY-MM-DD')}`));
    };

    personalFilter = (value) => {
        this.setState({
            personalFilter: value
        });
    };

    coverageFilter = (value) => {
        this.setState({
            coverageFilter: value
        })
    };

    render(){
        const {tourAssignmentModalState, selectedTour, currentMonth, addATourState} = this.state;
        const { profile, tours, auth } = this.props;

        if(!profile.isLoaded && profile.isEmpty && !profile.roles){
            return (
                <DefinedRow type="flex" direction="column" height="100%" width="100%" justify="center" align="middle">
                    <Spin size="large" />
                    <Title>Loading</Title>
                </DefinedRow>
            )
        }
        return (
            <Fragment>
                <AddTourModal visible={addATourState} onOk={() => this.closeModal("addATourState")} onCancel={() => this.closeModal("addATourState")}/>
                {selectedTour && <TourAssignmentModal title={this.formatEventTitle(selectedTour)} tour={selectedTour} visible={tourAssignmentModalState} onOk={() => this.closeModal("tourAssignmentModalState")} onCancel={() => this.closeModal("tourAssignmentModalState")}/>}
                <Calendar
                    onPanelChange={this.setCurrentMonth}
                    dateCellRender={this.dateCellRender}
                    value={(moment(this.props.match.params.startTime))}
                    headerRender={({ value, type, onChange, onTypeChange }) => {
                        const start = 0;
                        const end = 12;
                        const monthOptions = [];

                        const current = value.clone();
                        const localeData = value.localeData();
                        const months = [];
                        for (let i = 0; i < 12; i++) {
                            current.month(i);
                            months.push(localeData.monthsShort(current));
                        }

                        for (let index = start; index < end; index++) {
                            monthOptions.push(
                                <Select.Option key={`${index}`}>
                                    {months[index]}
                                </Select.Option>,
                            );
                        }
                        const month = value.month();
                        return (
                            <Row type="flex" align="middle" justify="end">
                                <Col span={24} style={styles.headerRow}>
                                    <Row type="flex" justify="center">
                                        <Title level={2}>{currentMonth} Tour Calendar</Title>
                                    </Row>
                                </Col>
                                <Col span={16}>
                                    <Row type="flex" justify="start">
                                        <Badge color="blue" text="Admissions Tour" style={styles.headerItem}/>
                                        <Badge color="red" text="Coverage Needed" style={styles.headerItem}/>
                                        <Badge color="gold" text="Group Visit" style={styles.headerItem}/>
                                        <Badge color="geekblue" text="Fall for Brandeis Day" style={styles.headerItem}/>
                                    </Row>
                                </Col>
                                <Col span={8}>
                                    <Row type="flex" align="middle" justify="end">
                                        <Select
                                            dropdownMatchSelectWidth={false}
                                            value={String(month)}
                                            onChange={selectedMonth => {
                                                const newValue = value.clone();
                                                newValue.month(parseInt(selectedMonth, 10));
                                                onChange(newValue);
                                            }}
                                        >
                                            {monthOptions}
                                        </Select>
                                    </Row>
                                </Col>
                                <Col span={24}>
                                    <Row type="flex" align="middle">
                                        <Col span={18} style={styles.headerRow}>
                                            <Row type="flex" justify="start">
                                                {profile.roles && profile.roles.admin &&
                                                    <Fragment>
                                                        <Button type="primary" icon="mail" style={styles.headerItem}>Email Guides</Button>
                                                        <Button type="primary" icon="calendar" style={styles.headerItem} onClick={() => {

                                                        }}>Generate Calendar</Button>
                                                            <Button type="primary" icon="plus-circle" onClick={() => this.openModal("addATourState")} style={styles.headerItem}>Add Tour</Button>
                                                    </Fragment>
                                                }
                                                {profile.roles && profile.roles.tourGuide &&
                                                    <Fragment>
                                                        <Dropdown overlay={
                                                            <Menu>
                                                                <Menu.Item key="1" onClick={() => downloadToursToICal(tours, auth)}>Download to iCalendar</Menu.Item>
                                                                <Menu.Item key="2" onClick={() => downloadToursToGoogleCalendar(tours, auth)}>Download to Google Calendar</Menu.Item>
                                                        </Menu>
                                                        }>
                                                            <Button type="primary" icon="calendar" style={styles.headerItem}>Download to Calendar</Button>
                                                        </Dropdown>
                                                    </Fragment>
                                                }
                                            </Row>
                                        </Col>
                                        <Col span={6} style={styles.headerRow}>
                                            <Row type="flex" align="middle" justify="end">
                                                {profile.roles && profile.roles.tourGuide && <div style={styles.headerItem}>My tours: <Switch onChange={this.personalFilter}></Switch></div>}
                                                Coverage needed: <Switch onChange={this.coverageFilter}></Switch>
                                            </Row>
                                        </Col>

                                    </Row>
                                </Col>
                            </Row>)
                    }}/>
            </Fragment>
        );
    }
};

const styles = {
    headerItem: {
        marginRight: '1em'
    },
    headerRow: {
        marginTop: '1em',
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, null),
    firestoreConnect((props) => [{
        collection: 'tours',
        where: [
            ['date', '>=', new Date(props.match.params.startTime)],
            ['date', '<=', new Date(props.match.params.endTime)]
        ]
    }])
)(TourCalendar);
