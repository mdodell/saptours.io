import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'antd';
import {
    dropSelfFromTour,
    getAssignedTourGuides,
    addSelfToTour,
    publishTour,
    unpublishTour
} from "../../../../redux/tours/tourActions";
import TourAssignmentFooter from "./components/TourAssignmentFooter";
import EditTourDrawer from "./components/EditTourDrawer";

const mapDispatchToProps = {
    getAssignedTourGuides,
    dropSelfFromTour,
    addSelfToTour,
    publishTour,
    unpublishTour
};

const mapStateToProps = (state) => {
    return {
        userId: state.firebase.auth.uid,
        profile: state.firebase.profile
    }
};

const mapGuides = (guides) => {
    return guides.map(guide =>
        <li key={guide.id}>{guide.user.fullName}, {guide.user.email}{guide.user.phoneNumber ? ', ' + guide.user.phoneNumber : ''}</li>
    );
};

class TourAssignmentModal extends Component {
    state = {
        drawerVisible: false
    };

    toggleDrawer = () => {
        this.setState({
            drawerVisible: !this.state.drawerVisible
        })
    };

render(){

    const {drawerVisible} = this.state;
    const {
        onCancel,
        onOk,
        tour,
        visible,
        title,
        userId,
        dropSelfFromTour,
        addSelfToTour,
        profile,
        publishTour,
        unpublishTour
    } = this.props;

    return (
        <Fragment>
            <Modal
                title={title}
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
                footer={
                    <TourAssignmentFooter
                        tour={tour}
                        dropSelfFromTour={dropSelfFromTour}
                        onOk={onOk}
                        userId={userId}
                        addSelfToTour={addSelfToTour}
                        profile={profile}
                        publishTour={publishTour}
                        unpublishTour={unpublishTour}
                        toggleDrawer={() => this.toggleDrawer()}
                    />
                }
            >
                {tour && tour.assignedGuides.length === 0 ?
                    <div>
                        There are no tour guides assigned to this tour!
                    </div> :
                    <div>
                        Please show up to your tour 15 minutes before the
                        tour! {tour.assignedGuides.length === 1 ? 'The person giving' : 'The tour guides giving'} this
                        tour will be: {tour.assignedGuides ? <ul>{mapGuides(tour.assignedGuides)}</ul> : ''}. {tour.description}
                    </div>
                }
            </Modal>
            <EditTourDrawer visible={drawerVisible} title={title} tour={tour} toggleDrawer={() => this.toggleDrawer()} onOk={onOk}/>
        </Fragment>
    );
}


};

export default connect(mapStateToProps, mapDispatchToProps)(TourAssignmentModal);