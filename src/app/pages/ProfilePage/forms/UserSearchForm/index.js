import React from 'react';
import { Typography, Input, Select } from 'antd';
import { AntSelect, AntTextArea } from "../../../../common/components/form/AntFormik";
import {DECISION_TYPES, FELLOWSHIPS_AND_SCHOLARSHIPS, MAJOR_LIST, MINOR_LIST} from "../../../../common/constants";


const { Title } = Typography;

const UserSearchForm = () => {
    return (
        <span>
        <Input
            type="text"
            //size={size}
            //value={number}
            //onChange={this.handleNumberChange}
            style={{ width: '65%', marginRight: '3%' }}
        />
        <Select
            value='search'
            style={{ width: '32%' }}
            //onChange={this.handleCurrencyChange}
        >
          <Option value="rmb">RMB</Option>
          <Option value="dollar">Dollar</Option>
        </Select>
      </span>
    )};
export default UserSearchForm;