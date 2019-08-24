import React, {useState} from 'react';
import {Table, Tag, Typography} from 'antd';
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

};

const getExtra=(record)=>{
    let extraInfo=[];
    if(record.dietaryRestrictions){
        extraInfo.push(`Dietary Restrictions: ${record.dietaryRestrictions}`)
    }
    if(record.research){
        extraInfo.push(`Research: ${record.research}`)
    }
    if(record.graduationPlans){
        extraInfo.push(`Post Graduation Plans: ${record.graduationPlans}`)
    }
    if(record.highSchool){
        extraInfo.push(`High School: ${record.highSchool}`)
    }
    if(record.internships){
        extraInfo.push(`Internships: ${record.internships}`)
    }
    if(record.jobs){
        extraInfo.push(`Jobs: ${record.jobs}`)
    }
    if(record.decisionType){
        extraInfo.push(`Decision Type: ${record.decisionType}`)
    }
    extraInfo=addCommas(extraInfo);
    return extraInfo;
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
            { text: 'Ambassador', value: 'Ambassador' },
            { text: 'Chatter', value: 'Chatter' },
            { text: 'Host', value: 'Host'},
            { text: 'Admin', value:'Admin'}
            ],
        onFilter: (value, record) => record.roles.indexOf(value) === 0,
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
        title: 'City',
        dataIndex: 'city',
        key: 'city',
        width:130,
        //add search
        render: (city) => <span>{city || '-'}</span>
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
        width: 100,
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