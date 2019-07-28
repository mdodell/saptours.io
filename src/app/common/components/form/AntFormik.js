import {DatePicker, Input, TimePicker, Select} from "antd";
import {CreateAntField} from "../../utils/createAntFields";


export const AntSelect = CreateAntField(Select);
export const AntDatePicker = CreateAntField(DatePicker);
export const AntTimePicker = CreateAntField(TimePicker);
export const AntPassword = CreateAntField(Input.Password);
export const AntInput = CreateAntField(Input);