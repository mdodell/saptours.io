import React, {Fragment, useState} from 'react';
import {
    Table,
    Tag,
    Typography,
    Descriptions,
    Divider,
    Popconfirm,
    Button,
    message,
    Icon,
    Progress,
    Row,
    Spin, Col,
} from 'antd';
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {
    AND_QUERY,
    CLUB_TYPES,
    ED1,
    ED2,
    HOME_ROUTE,
    INTERNATIONAL_STUDENT, LEGACY_STUDENT,
    MIDYEAR,
    MKTYP,
    POSSE,
    REGULAR_DECISION, TRANSFER_STUDENT
} from "../../../common/constants";
import {DefinedRow} from "../../../common/components/styled";
import {deleteUser, promoteToAdmin} from "../../../redux/auth/authActions";
import {withRouter} from "react-router-dom";
import {incrementUserNoShows} from "../../../redux/tours/tourActions";
import {Formik} from "formik";
import UserTableFilterForm from "./forms/UserTableFilterForm";

const mapStateToProps = (state) => ({
    users: state.firestore.ordered.users,
    profile: state.firebase.profile,
    auth: state.firebase.auth
});

const mapDispatchToProps = {
    deleteUser,
    promoteToAdmin,
    incrementUserNoShows
};

const { Title, Text } = Typography;

const getClubColor = (club) => {
    if(CLUB_TYPES.ACADEMIC.includes(club)){
        return 'geekblue';
    } else if(CLUB_TYPES.ARTS_AND_CULTURE.includes(club)){
        return 'magenta';
    } else if(CLUB_TYPES.COMPETITION.includes(club)){
        return 'purple';
    } else if(CLUB_TYPES.MEDIA_AND_PUBLICATIONS.includes(club)){
        return 'volcano';
    } else if(CLUB_TYPES.PERFORMANCE.includes(club)){
        return 'lime';
    } else if(CLUB_TYPES.POLITICAL_AND_ACTIVISM.includes(club)){
        return 'blue';
    } else if(CLUB_TYPES.PERFORMANCE.includes(club)){
        return 'cyan';
    } else if(CLUB_TYPES.SPIRITUAL_AND_RELIGIOUS.includes(club)){
        return 'gold';
    } else if(CLUB_TYPES.SPORTS_AND_FITNESS.includes(club)){
        return 'red';
    } else if(CLUB_TYPES.MISCELLANEOUS.includes(club)){
        return 'green';
    } else {
        return 'green';
    }
};

const getRoles=(roles)=>{
    const rolesArray=[];
    if(roles.admin){
        rolesArray.push('Admin');
        rolesArray.push(', ');
    }
    if(roles.tourGuide){
        rolesArray.push('Ambassador');
        rolesArray.push(', ');
    }
    if(roles.chatter){
        rolesArray.push('Chatter');
        rolesArray.push(', ');
    }
    if(roles.host){
        rolesArray.push('Host');
        rolesArray.push(', ');
    }

    rolesArray.pop();
    return rolesArray;

};

const getDecision=(decisionType)=>{
    const decisionArray=[];
    if(decisionType.ED1){
        decisionArray.push('ED1');
        decisionArray.push(', ');
    }
    if(decisionType.ED2){
        decisionArray.push('ED2');
        decisionArray.push(', ');
    }
    if(decisionType.MKTYP){
        decisionArray.push('Myra Kraft Transitional Year Program');
        decisionArray.push(', ');
    }
    if(decisionType.POSSE){
        decisionArray.push('POSSE');
        decisionArray.push(', ');
    }
    if(decisionType.international){
        decisionArray.push('International Student');
        decisionArray.push(', ');
    }
    if(decisionType.legacy){
        decisionArray.push('Legacy Student');
        decisionArray.push(', ');
    }
    if(decisionType.midyear){
        decisionArray.push('Midyear');
        decisionArray.push(', ');
    }
    if(decisionType.regularDecision){
        decisionArray.push('Regular Decision');
        decisionArray.push(', ');
    }
    if(decisionType.transfer){
        decisionArray.push('Transfer Student');
        decisionArray.push(', ');
    }

    decisionArray.pop();
    return decisionArray;
};

const displayClubs = clubs => clubs.map(club => <Tag key={club} color={getClubColor(club)}>{club}</Tag>);

const displayExtraFields = (record, profile, auth, history, promoteToAdmin, incrementUserNoShows, deleteUser) =>{
    return(
        <Descriptions title={expandedRowHeader(record, profile, auth, history, promoteToAdmin, incrementUserNoShows, deleteUser)} layout="horizontal" column={3} bordered>
            <Descriptions.Item label="Dietary Restrictions">
                {record.dietaryRestrictions ?  record.dietaryRestrictions.length === 0 ? 'N/A' : record.dietaryRestrictions.join(', ') : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Research">
                {(record.research) ? record.research : ("N/A")}
            </Descriptions.Item>
            <Descriptions.Item label="Graduation Plans">
                {(record.graduationPlans) ? record.graduationPlans : ("N/A")}
            </Descriptions.Item>
            <Descriptions.Item label="High School">
                {(record.highSchool) ? record.highSchool : ("N/A")}
            </Descriptions.Item>
            <Descriptions.Item label="Hometown">
                {(record.city) ? `${record.city}${record.state ? ', ' + record.state : ''}` : ("N/A")}
            </Descriptions.Item>
            <Descriptions.Item label="Internships & Study Abroad">
                {(record.internships) ? record.internships : ("N/A")}
            </Descriptions.Item>
            <Descriptions.Item label="Jobs">
                {(record.jobs) ? record.jobs : ("N/A")}
            </Descriptions.Item>
            <Descriptions.Item label="Decision Type">
                {(record.decisionType) ? getDecision(record.decisionType) : ("N/A")}
            </Descriptions.Item>
            <Descriptions.Item label="Dietary Restrictions">
                {(record.dietaryRestrictions) ? record.dietaryRestrictions : ("N/A")}
            </Descriptions.Item>
            <Descriptions.Item label="Clubs">
                {(record.clubs) ? displayClubs(record.clubs) : ("N/A")}
            </Descriptions.Item>
        </Descriptions>

    );
};

const expandedRowHeader = (record, profile, auth, history, promoteToAdmin, incrementUserNoShows, deleteUser) => {
    return (
        <DefinedRow type="flex" width="100%" height="100%">
            <Col span={24}>
                <DefinedRow type="flex" align="middle" width="100%" height="100%">
                    <Col>
                        <Title level={4} style={styles.noMargin}>Other Info</Title>
                    </Col>
                    <Col style={styles.flexGrow}>
                        <Row type="flex" align="middle" justify="end">
                            {record.id !== auth.uid &&
                            <Fragment>
                                <Button type="primary" onClick={() => window.open(`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${record.email}`)}>Email User <Icon type="mail"/></Button>
                                { profile.roles.admin && <Divider type="vertical" style={{background: '#545456'}}/>}
                            </Fragment>
                            }
                            {(profile.roles.admin && !record.roles.admin) &&
                            <Fragment>
                                <Popconfirm
                                    title={`Are you sure you want to promote ${record.fullName} to admin status?`}
                                    onConfirm={() => promoteToAdmin(record, profile)}
                                    onCancel={() => cancelAction(`${record.fullName} was not promoted!`)}
                                    okText="Yes"
                                    cancelText="No"
                                    placement="topRight"
                                >
                                    <Button>Promote to Admin <Icon type="crown"/></Button>
                                </Popconfirm>
                                <Divider type="vertical" style={{background: '#545456'}}/>
                            </Fragment>
                            }
                            {
                                (profile.roles.admin && record.roles.tourGuide) &&
                                <Fragment>
                                    <Popconfirm
                                        title={`Are you sure you want to increment the number of no shows for ${record.fullName}?`}
                                        onConfirm={() => incrementUserNoShows(record.id)}
                                        onCancel={() => cancelAction('The user did not have an increase in no shows!')}
                                        okText="Yes"
                                        cancelText="No"
                                        placement="topRight"
                                    >
                                        <Button type="danger">Guide No Show <Icon type="frown"/></Button>
                                    </Popconfirm>
                                    <Divider type="vertical" style={{background: '#545456'}}/>
                                </Fragment>
                            }
                            {
                                ( record.id === auth.uid || profile.roles.admin ) &&
                                <Popconfirm
                                    title={`Are you sure you want to delete ${record.fullName}?`}
                                    onConfirm={() => {
                                        deleteUser(record, profile);
                                        if(record.id === auth.uid) {
                                            history.push(HOME_ROUTE);
                                        }
                                    }}
                                    onCancel={() => cancelAction('The user was not deleted!')}
                                    okText="Yes"
                                    cancelText="No"
                                    placement="topRight"
                                >
                                    <Button type="danger" style={{cursor: 'pointer'}}>Delete User <Icon type="delete"/></Button>
                                </Popconfirm>
                            }
                        </Row>
                    </Col>
                </DefinedRow>
            </Col>
            {profile.roles.admin && <Col style={styles.marginTop} span={24}>
                <Text strong level={4}>{`Last Login: ${record.lastLogin.toDate()}`}</Text>
            </Col>}
        </DefinedRow>
        )
};

const cancelAction = (messageText) => {
    message.error(messageText);
};

const UserTable = ({users, profile, auth, deleteUser, history, promoteToAdmin, incrementUserNoShows}) => {

    const [filters, updateFilters] = useState({
        majors: [],
        minors: [],
        decisionType: [],
        AND: false,
        state: null
    });
    if(!profile.isLoaded && profile.isEmpty && !profile.roles){
        return (
            <DefinedRow type="flex" direction="column" height="100%" width="100%" justify="center" align="middle">
                <Spin size="large" />
                <Title>Loading</Title>
            </DefinedRow>
        )
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'fullName',
            key: 'fullName',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.fullName.localeCompare(b.fullName),
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            render: roles => (
                roles && <span>{getRoles(roles)}
            </span>),
            filters: [
                { text: 'Ambassador', value: 'tourGuide' },
                { text: 'Chatter', value: 'chatter' },
                { text: 'Host', value: 'host'},
                { text: 'Admin', value:'admin'}
            ],
            onFilter: (value, record) => record.roles[value],
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
            render: (state) => <span>{state || '-'}</span>
        },
        {
            title: 'Majors',
            dataIndex: 'majors',
            key: 'majors',
            render: (majors) => majors && <span>{majors.join(', ')}</span>
        },
        {
            title: 'Minors',
            dataIndex: 'minors',
            key: 'minors',
            render: minors => minors && <span>{minors.join(', ')}</span>,
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: phoneNumber => <span>{phoneNumber || '-'}</span>
        },
    ];


    const filtersEntered = () => {
        return filters.majors.length > 0 || filters.minors.length > 0 || filters.decisionType.length > 0 || filters.state !== '';
    };

    const initialValues = {
        majors: [],
        minors: [],
        decisionType: [],
        AND: "AND Query",
    };

    const usersAndFilter = users && users.filter(user =>
        ((user.majors && user.majors.some(major => filters.majors.indexOf(major) >= 0)) || filters.majors.length === 0) &&
        ((user.minors && user.minors.some(minor => filters.minors.indexOf(minor) >= 0)) || filters.minors.length === 0) &&
        ((user.decisionType && (
                (user.decisionType.ED1 && filters.decisionType.includes(ED1)) ||
                (user.decisionType.ED2 && filters.decisionType.includes(ED2)) ||
                (user.decisionType.regularDecision && filters.decisionType.includes(REGULAR_DECISION)) ||
                (user.decisionType.midyear && filters.decisionType.includes(MIDYEAR)) ||
                (user.decisionType.POSSE && filters.decisionType.includes(POSSE)) ||
                (user.decisionType.MKTYP && filters.decisionType.includes(MKTYP)) ||
                (user.decisionType.international && filters.decisionType.includes(INTERNATIONAL_STUDENT)) ||
                (user.decisionType.legacy && filters.decisionType.includes(LEGACY_STUDENT)) ||
                (user.decisionType.transfer && filters.decisionType.includes(TRANSFER_STUDENT))
            )) || filters.decisionType.length === 0
        ) &&
        ((user.state && user.state === filters.state) || !filters.state)
    );

    const usersOrFilter = users && users.filter(user =>
        ((user.majors && user.majors.some(major => filters.majors.indexOf(major) >= 0))) ||
        ((user.minors && user.minors.some(minor => filters.minors.indexOf(minor) >= 0))) ||
        (user.decisionType &&
            (
                (user.decisionType.ED1 && filters.decisionType.includes(ED1)) ||
                (user.decisionType.ED2 && filters.decisionType.includes(ED2)) ||
                (user.decisionType.regularDecision && filters.decisionType.includes(REGULAR_DECISION)) ||
                (user.decisionType.midyear && filters.decisionType.includes(MIDYEAR)) ||
                (user.decisionType.POSSE && filters.decisionType.includes(POSSE)) ||
                (user.decisionType.MKTYP && filters.decisionType.includes(MKTYP)) ||
                (user.decisionType.international && filters.decisionType.includes(INTERNATIONAL_STUDENT)) ||
                (user.decisionType.legacy && filters.decisionType.includes(LEGACY_STUDENT)) ||
                (user.decisionType.transfer && filters.decisionType.includes(TRANSFER_STUDENT))
            )
        ) || ((user.state && user.state === filters.state) || !filters.state)
    );

    return (
        <div>
            <Row>
                <Title style={styles.marginTop} level={2}>Guide List</Title>
            </Row>
            <Formik initialValues={initialValues} render={UserTableFilterForm} onSubmit={formValues => updateFilters({
                majors: formValues.majors,
                minors: formValues.minors,
                decisionType: formValues.decisionType,
                AND: formValues.AND === AND_QUERY,
                state: formValues.state
            })}
            />
            <Table
                columns={columns}
                dataSource={filtersEntered(filters) ? (filters.AND ? usersAndFilter : usersOrFilter) : users}
                scroll={{ x:1000}}
                pagination={false}
                style={styles.marginBottom}
                bordered={true}
                rowKey='id'
                expandedRowRender={record => {
                    let {tourStatistics} = record;
                    return (
                        <div style={{ margin: 0 }}>
                            {displayExtraFields(record, profile, auth, history, promoteToAdmin, incrementUserNoShows, deleteUser)}
                            {(profile.roles.admin || auth.uid === record.id) &&
                                <div style={styles.marginTop}>
                                    <Text style={styles.subHeadingStyle} strong level={4}>Tour Guide Statistics: {`(${record.tourStatistics.totalTours} ${record.tourStatistics.totalTours === 1 ? 'Tour' : 'Tours'})`}</Text>
                                    <Row type="flex" justify="space-between" style={styles.marginTop}>
                                        <Row type="flex" style={styles.statisticContainer} align="middle" justify="center">
                                            <Progress
                                                type="circle"
                                                percent={Math.floor((tourStatistics.claimedTours/tourStatistics.totalTours) * 100) === 100 ? Infinity : Math.floor((tourStatistics.claimedTours/tourStatistics.totalTours) * 100)}
                                                strokeLinecap="square"/>
                                            <Text strong>Covered Tours</Text>
                                        </Row>
                                        <Row type="flex" style={styles.statisticContainer} align="middle" justify="center">
                                            <Progress
                                                type="circle"
                                                percent={Math.floor((tourStatistics.droppedTours/tourStatistics.totalTours) * 100) === 100 ? Infinity : Math.floor((tourStatistics.droppedTours/tourStatistics.totalTours) * 100)}
                                                strokeColor="#F4C300"
                                                strokeLinecap="square"
                                            />
                                            <Text strong>Dropped Tours</Text>
                                        </Row>
                                        <Row type="flex" style={styles.statisticContainer} align="middle" justify="center">
                                            <Progress
                                                type="circle"
                                                percent={Math.floor((tourStatistics.noShows/tourStatistics.totalTours) * 100) === 100 ? Infinity : Math.floor((tourStatistics.noShows/tourStatistics.totalTours) * 100)}
                                                strokeColor="red"
                                                strokeLinecap="square"/>
                                            <Text strong>No Shows</Text>
                                        </Row>
                                    </Row>
                                </div>
                            }

                        </div>
                    )
                }
                }
            />
        </div>
    );
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    firestoreConnect(() => [{collection: 'users'}])
)(UserTable);

const styles = {
    noMargin: {
        margin: '0'
    },
    subHeadingStyle: {
        marginTop: '1em',
        marginBottom: '1em'
    },
    flexGrow: {
        flexGrow: '1'
    },
    marginTop: {
      marginTop: '1em'
    },
    marginBottom: {
       marginBottom: '1em'
    },
    statisticContainer: {
        flexDirection: 'column',
        marginRight: '3em'
    }
};