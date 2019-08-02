import React, {Component, Fragment} from 'react';
import { Calendar, Badge, Switch } from 'antd';
import './index.css';
import TourAssignmentModal from "../../../common/components/modals/TourAssignmentModal";

class TourCalendar extends Component {

    state = {
        modalState: false,
        selectedTour: null,
        personalFilter: false
    };

    getListData = (value)=> {
        let listData;
        switch (value.date()) {
            case 8:
                listData = [
                    { type: 'success', content: '9:00 am Group Tour', guidesRequested: 3, guidesAssigned: 3, coverage: false, guideIds: ["Mitchell Dodell", "Ben Greene", "Angela Liu"], time: "9:00 am" },
                    { type: 'error', content: '9:00 am Admissions Tour', guidesRequested: 3, guidesAssigned: 2, coverage: true, guideIds: ["Mitchell Dodell", "Ben Greene", ], time: "9:00 am" },
                    { type: 'error', content: '11:00 am Admissions Tour', guidesRequested: 3, guidesAssigned: 3, coverage: true, guideIds: ["Mitchell Dodell", "Ben Greene", ], time: "11:00 am" },
                ];
                break;
            case 9:
                listData = [
                    { type: 'success', content: '9:00 am Group Tour', guidesRequested: 3, guidesAssigned: 3, coverage: false, guideIds: ["Mitchell Dodell", "Ben Greene", "Angela Liu"], time: "9:00 am" },
                    { type: 'error', content: '9:00 am Admissions Tour', guidesRequested: 3, guidesAssigned: 2, coverage: true, guideIds: ["Mitchell Dodell", "Ben Greene", ], time: "9:00 am" },
                    { type: 'error', content: '11:00 am Admissions Tour', guidesRequested: 3, guidesAssigned: 3, coverage: true, guideIds: ["Mitchell Dodell", "Ben Greene", ], time: "11:00 am" },
                ];
                break;
            case 11:
                listData = [
                    { type: 'success', content: '9:00 am Group Tour', guidesRequested: 3, guidesAssigned: 3, coverage: false, guideIds: ["Mitchell Dodell", "Ben Greene", "Angela Liu"], time: "9:00 am" },
                    { type: 'error', content: '9:00 am Admissions Tour', guidesRequested: 3, guidesAssigned: 2, coverage: true, guideIds: ["Mitchell Dodell", "Ben Greene", ], time: "9:00 am" },
                    { type: 'error', content: '11:00 am Admissions Tour', guidesRequested: 3, guidesAssigned: 3, coverage: true, guideIds: ["Mitchell Dodell", "Ben Greene", ], time: "11:00 am" },
                ];
                break;
            case 10:
                listData = [
                    { type: 'success', content: '9:00 am Group Tour', guidesRequested: 3, guidesAssigned: 3, coverage: false, guideIds: ["Mitchell Dodell", "Ben Greene", "Angela Liu"], time: "9:00 am" },
                    { type: 'error', content: '9:00 am Admissions Tour', guidesRequested: 3, guidesAssigned: 2, coverage: true, guideIds: ["Mitchell Dodell", "Ben Greene", ], time: "9:00 am" },
                    { type: 'error', content: '11:00 am Admissions Tour', guidesRequested: 3, guidesAssigned: 3, coverage: true, guideIds: ["Mitchell Dodell", "Ben Greene", ], time: "11:00 am" },
                ];
                break;
            case 15:
                listData = [
                    { type: 'success', content: '9:00 am Group Tour', guidesRequested: 3, guidesAssigned: 3, coverage: false, guideIds: ["Mitchell Dodell", "Ben Greene", "Angela Liu"], time: "9:00 am" },
                    { type: 'error', content: '9:00 am Admissions Tour', guidesRequested: 3, guidesAssigned: 2, coverage: true, guideIds: ["Mitchell Dodell", "Ben Greene", ], time: "9:00 am" },
                    { type: 'error', content: '11:00 am Admissions Tour', guidesRequested: 3, guidesAssigned: 3, coverage: true, guideIds: ["Mitchell Dodell", "Ben Greene", ], time: "11:00 am" },
                ];
                break;
            default:
        }
        return listData || [];
    };

    handleTourSelect = (tour) => {
        this.setState({
            modalState: true,
            selectedTour: tour
        })
    };

    closeModal = (event) => {
        event.preventDefault();
        this.setState({
            modalState: false
        })
    };

    dateCellRender = (value) => {
        const listData = this.state.personalFilter ? this.getListData(value).filter(tour => tour.guideIds.includes("Angela Liu")) : this.getListData(value);
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.content} onClick={(e) => {
                        e.preventDefault();
                        this.handleTourSelect(item)
                    }}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    personalFilter = (value) => {
        this.setState({
            personalFilter: value
        })
    };

    render(){
        const {modalState, selectedTour} = this.state;
        return (
            <Fragment>
                <TourAssignmentModal tour={selectedTour} visible={modalState} onOk={this.closeModal} onCancel={this.closeModal}/>
                <Calendar dateCellRender={this.dateCellRender} headerRender={() => <Switch onChange={this.personalFilter}></Switch>}/>
            </Fragment>
        );
    }
};

export default TourCalendar;
