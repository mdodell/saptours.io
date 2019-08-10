import React from 'react';
import {connect} from 'react-redux';
import {Modal, Row, Button} from 'antd';
import {dropSelfFromTour, getAssignedTourGuides, addSelfToTour} from "../../../../redux/tours/tourActions";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

const mapDispatchToProps = {
    getAssignedTourGuides,
    dropSelfFromTour,
    addSelfToTour
};

const mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.users,
        userId: state.firebase.auth.uid
    }
};

const mapGuides = (guides) => {
    return guides.map(guide =>
        <li key={guide.id}>{guide.fullName}, {guide.email}, {guide.phoneNumber}</li>
    );
};

const TourAssignmentModal = ({onCancel, onOk, tour, visible, title, users, userId, dropSelfFromTour, addSelfToTour}) => {
    if (users) {
        let tourGuides = users.filter(user => (tour.assignedGuides.includes(user.id)));
        if (tourGuides) {
            return (
                <div>
                    <Modal
                        title={title}
                        visible={visible}
                        onOk={onOk}
                        onCancel={onCancel}
                        footer={
                            <TourAssignmentFooter
                                tour={tour}
                                dropSelfFromTour={dropSelfFromTour}
                                onOk={onOk} userId={userId}
                                addSelfToTour={addSelfToTour}
                            />
                        }
                    >
                        {tourGuides && tourGuides.length === 0 ?
                            <div>
                                There are no tour guides assigned to this tour!
                            </div> :
                            <div>
                                Please show up to your tour 15 minutes before the
                                tour! {tourGuides.length === 1 ? 'The person giving' : 'The tour guides giving'} this
                                tour will be: {tourGuides ? <ul>{mapGuides(tourGuides)}</ul> : ''}.
                            </div>
                        }

                    </Modal>
                </div>
            );
        }
        return <h1>Loading...</h1>
    }
    return <h1>Loading..</h1>
};

const TourAssignmentFooter = ({tour, dropSelfFromTour, onOk, userId, addSelfToTour}) => {
    if (tour.assignedGuides.includes(userId)) {
        return <DropTourFooter tour={tour} dropSelfFromTour={dropSelfFromTour} onOk={onOk}/>;
    } else if (tour.numberOfGuidesRequested > tour.assignedGuides.length) {
        return <ProvideCoverageFooter tour={tour} addSelfToTour={addSelfToTour} onOk={onOk}/>;
    } else {
        return null
    }
};

const ProvideCoverageFooter = ({tour, onOk, addSelfToTour}) => {
    return (
        <Row type="flex" justify="end">
            <Button type="primary" onClick={() => {
                addSelfToTour(tour);
                onOk();
            }}>Provide Coverage</Button>
        </Row>
    );
};

// const AdminFooter = () => {
//
// };

const DropTourFooter = ({tour, dropSelfFromTour, onOk}) => {
    return (
        <Row type="flex" justify="end">
            <Button type="danger" onClick={() => {
                dropSelfFromTour(tour);
                onOk()
            }}>Drop Tour</Button>
        </Row>
    )
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => [{collection: 'users'}])
)(TourAssignmentModal);