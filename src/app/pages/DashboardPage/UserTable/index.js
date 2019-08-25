import React, {useState} from 'react';
import {Table, Tag, Typography, Descriptions, Divider} from 'antd';
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {CLUBTYPES} from "../../../common/constants";

const mapStateToProps = (state) => ({
    users: state.firestore.ordered.users,
});

const { Title } = Typography;

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
    console.log(decisionType);
    if(decisionType.ED1){
        decisionArray.push('ED 1');
        decisionArray.push(', ');
    }
    if(decisionType.ED2){
        decisionArray.push('ED 2');
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
        decisionArray.push('International');
        decisionArray.push(', ');
    }
    if(decisionType.legacy){
        decisionArray.push('Legacy');
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
        decisionArray.push('International');
        decisionArray.push(', ');
    }

    decisionArray.pop();
    return decisionArray;
};

const getExtra=(record)=>{
    return(
    <Descriptions title="Other Info">
        <Descriptions.Item label="Dietary Restrictions">
            {(record.dietaryRestrictions) ? record.dietaryRestrictions : ("N/A")}
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
            {(record.city) ? `${record.city}, ${record.state}` : ("N/A")}
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

    </Descriptions>
    );
};

const columns = [
    {
        title: 'Name',
        dataIndex: 'fullName',
        key: 'fullName',
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => a.fullName.localeCompare(b.fullName),
        width: 150,
    },
    {
        title: 'Roles',
        dataIndex: 'roles',
        key: 'roles',
        width:150,
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
        sorter: (a, b) => a.graduationYear-b.graduationYear,
        width: 115,
        render: (graduationYear) => <span>{graduationYear || '0'}</span>
    },
    {
        title: 'State',
        dataIndex: 'state',
        key: 'state',
        width:130,
        render: (state) => <span>{state || '-'}</span>
    },
    {
        title: 'Majors',
        dataIndex: 'majors',
        key: 'majors',
        width:200,
        //search and sort
        render: majors => (
    majors&&<span>{addCommas(majors)}
            </span>),
    },
    {
        title: 'Minors',
        dataIndex: 'minors',
        key: 'minors',
        width:200,
        render: minors => (
            minors&&<span>{addCommas(minors)}
            </span>),
    },
    {
        title: 'Clubs',
        key: 'clubs',
        dataIndex: 'clubs',
        width: 40,
        textWrap: 'word-break',
        render: clubs => (
             clubs&&<span>
        {clubs.map(club => {
            let color=clubColor(club);

            return (
                <Tag color={color} key={club}>
                    {club}
                </Tag>
            );
        })}
            </span>)
   },
    {
        title: 'Action',
        key: 'action',
        width: 100,
        render: () => (
            <span>
                 <a>Promote to Admin</a>
                 <Divider type="vertical" />
                 <a>Delete User</a>
             </span>
        ),
    },
];

const UserTable = ({users}) => {

    return (
        <div>
        <Title style={styles.headingStyle} level={2}>Guide List</Title>
        <Table
            columns={columns}
            dataSource={users}
            scroll={{ x:1000}}
            pagination={false}
            bordered={true}
            expandedRowRender={record => <p style={{ margin: 0 }}>{getExtra(record)}</p>}
        />
        </div>
    );
};

export default compose(
    connect(mapStateToProps, null),
    firestoreConnect(() => [{collection: 'users'}])
)(UserTable);

const styles = {
    headingStyle: {
        marginTop:'40px',
        padding: '30px',
        margin: 'auto',
        width: '100%'

    }
};