import React, {Fragment} from 'react';
import {Table, Tag, Typography, Descriptions, Divider, Popconfirm, message, Icon, Progress, Row, Spin} from 'antd';
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {CLUBTYPES, HOME_ROUTE} from "../../../common/constants";
import {DefinedRow} from "../../../common/components/styled";
import {deleteUser, promoteToAdmin} from "../../../redux/auth/authActions";
import {withRouter} from "react-router-dom";
import {incrementUserNoShows} from "../../../redux/tours/tourActions";

const mapStateToProps = (state) => ({
    users: state.firestore.ordered.users,
    profile: state.firebase.profile,
    auth: state.firebase.auth
});

const mapDispatchToProps = {
    deleteUser,
    promoteToAdmin,
    incrementUserNoShows
}

const { Title, Text } = Typography;

const clubColor =(club)=>{
    let color= 'green';

    if ((CLUBTYPES[0]).includes(club)) {
        color = 'geekblue';
    }
    else if((CLUBTYPES[1]).includes(club)){
        color='magenta';
    }
    else if((CLUBTYPES[2]).includes(club)){
        color='purple';
    }
    else if((CLUBTYPES[3]).includes(club)){
        color='volcano';
    }
    else if((CLUBTYPES[4]).includes(club)){
        color='green';
    }
    else if((CLUBTYPES[5]).includes(club)){
        color='blue';
    }
    else if((CLUBTYPES[6]).includes(club)){
        color='orange';
    }
    else if((CLUBTYPES[7]).includes(club)){
        color='cyan';
    }
    else if((CLUBTYPES[8]).includes(club)){
        color='gold';
    }
    else if((CLUBTYPES[9]).includes(club)){
        color='red';
    }
    return color;
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

const addCommas=(values)=>{
    return values.join(', ')
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
    if(decisionType.transferStudent){
        decisionArray.push('Transfer Student');
        decisionArray.push(', ');
    }

    decisionArray.pop();
    return decisionArray;
};

const getExtra=(record)=>{
    return(
        <Descriptions title="Other Info" layout="horizontal" column={3}>
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
            <Descriptions.Item label={`Tour Guide Statistics (${record.tourStatistics.totalTours} ${record.tourStatistics.totalTours === 1 ? 'Tour' : 'Tours'})`} span={3}></Descriptions.Item>
        </Descriptions>
    );
};

const cancelAction = (messageText) => {
    message.error(messageText);
};

const UserTable = ({users, profile, auth, deleteUser, history, promoteToAdmin, incrementUserNoShows}) => {
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
                roles&&<span>{getRoles(roles)}
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
            title: 'Grad Year',
            dataIndex: 'graduationYear',
            key: 'graduationYear',
            sortDirections: ['descend', 'ascend'],
            width: 100,
            sorter: (a, b) => a.graduationYear - b.graduationYear,
            render: (graduationYear) => <span>{graduationYear || '-'}</span>
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
            width: 50,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.fullName.localeCompare(b.fullName),
            render: (state) => <span>{state || '-'}</span>
        },
        {
            title: 'Majors',
            dataIndex: 'majors',
            key: 'majors',
            width: 200,
            //search and sort
            render: (majors) => majors && <span>{addCommas(majors)}</span>
        },
        {
            title: 'Minors',
            dataIndex: 'minors',
            key: 'minors',
            width:200,
            render: minors => minors && <span>{addCommas(minors)}</span>,
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: phoneNumber => <span>{phoneNumber || '-'}</span>
        },
        // TODO: Add this to the expander!
        //  {
        //      title: 'Clubs',
        //      key: 'clubs',
        //      dataIndex: 'clubs',
        //      // width: 100,
        //      textWrap: 'word-break',
        //      render: clubs => (
        //           clubs&&<div >
        //      {clubs.map(club => {
        //          let color=clubColor(club);
        //          return (
        //              <div>
        //              <Tag color={color} key={club}>
        //                  {club}
        //              </Tag>
        //              </div>
        //          );
        //      })}
        //          </div>)
        // },
        {
            title: 'Action',
            key: 'actions',
            width: 500,
            render: (user) => {
                return !profile.isEmpty && (
                <div>
                    {user.id !== auth.uid &&
                    <Fragment>
                        <Text style={{cursor: 'pointer'}} onClick={() => window.open(`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${user.email}`)}>Email User <Icon type="mail"/></Text>
                        { profile.roles.admin && <Divider type="vertical" style={{background: '#545456'}}/>}
                    </Fragment>
                    }
                    {(profile.roles.admin && !user.roles.admin) &&
                    <Fragment>
                        <Popconfirm
                            title={`Are you sure you want to promote ${user.fullName} to admin status?`}
                            onConfirm={() => promoteToAdmin(user, profile)}
                            onCancel={() => cancelAction('The user was not promoted!')}
                            okText="Yes"
                            cancelText="No"
                            placement="topRight"
                        >
                            <Text style={{cursor: 'pointer'}}>Promote to Admin <Icon type="crown"/></Text>
                        </Popconfirm>
                        <Divider type="vertical" style={{background: '#545456'}}/>
                    </Fragment>
                    }
                    {
                        (profile.roles.admin && user.roles.tourGuide) &&
                            <Fragment>
                                <Popconfirm
                                    title={`Are you sure you want to increment the number of no shows for ${user.fullName}?`}
                                    onConfirm={() => incrementUserNoShows(user.id)}
                                    onCancel={() => cancelAction('The user did not have an increase in no shows!')}
                                    okText="Yes"
                                    cancelText="No"
                                    placement="topRight"
                                >
                                    <Text style={{cursor: 'pointer'}}>Guide No Show <Icon type="frown"/></Text>
                                </Popconfirm>
                                <Divider type="vertical" style={{background: '#545456'}}/>
                            </Fragment>
                    }
                    {
                        ( user.id === auth.uid || profile.roles.admin ) &&
                        <Popconfirm
                            title={`Are you sure you want to delete ${user.fullName}?`}
                            onConfirm={() => {
                                deleteUser(user, profile);
                                if(user.id === auth.uid) {
                                    history.push(HOME_ROUTE);
                                }
                            }}
                            onCancel={() => cancelAction('The user was not deleted!')}
                            okText="Yes"
                            cancelText="No"
                            placement="topRight"
                        >
                            <Text type="danger" style={{cursor: 'pointer'}}>Delete User <Icon type="delete"/></Text>
                        </Popconfirm>
                    }
                </div>
            )},
        },
    ];

    return (
        <div>
            <Title style={styles.headingStyle} level={2}>Guide List</Title>
            <Table
                columns={columns}
                dataSource={users}
                scroll={{ x:1000}}
                pagination={false}
                bordered={true}
                rowKey='id'
                expandedRowRender={record => {
                    let {tourStatistics} = record;
                    return (
                        <div style={{ margin: 0 }}>
                            {getExtra(record)}
                            <Row type="flex" justify="space-between">
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
    headingStyle: {
        marginTop:'40px',
        padding: '30px',
        margin: 'auto',
        width: '100%'
    },
    statisticContainer: {
        flexDirection: 'column',
        marginRight: '3em'
    }
};