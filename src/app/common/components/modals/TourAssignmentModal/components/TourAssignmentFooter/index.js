import React from 'react';
import { Row, Col } from 'antd';
import AdminFooter from "../AdminFooter";
import DropTourFooter from "../DropTourFooter";
import ProvideCoverageFooter from "../ProvideCoverageFooter";


const TourAssignmentFooter = ({tour, dropSelfFromTour, onOk, userId, addSelfToTour, profile, publishTour, unpublishTour, toggleDrawer}) => {
    if(profile.roles.admin && tour.assignedGuideIds.includes(userId)){
        return (
            <Row type="flex" justify="end" gutter={16}>
                <Col>
                    <AdminFooter tour={tour} onOk={onOk} publishTour={publishTour} unpublishTour={unpublishTour} toggleDrawer={toggleDrawer}/>
                </Col>
                <Col>
                    <DropTourFooter tour={tour} dropSelfFromTour={dropSelfFromTour} onOk={onOk}/>
                </Col>
            </Row>
        )
    } else if(profile.roles.admin && tour.numberOfGuidesRequested > tour.assignedGuides.length){
        return (
            <Row type="flex" justify="end" gutter={16}>
                <Col>
                    <AdminFooter tour={tour} onOk={onOk} publishTour={publishTour} unpublishTour={unpublishTour} toggleDrawer={toggleDrawer}/>
                </Col>
                <Col>
                    <ProvideCoverageFooter tour={tour} addSelfToTour={addSelfToTour} onOk={onOk}/>
                </Col>
            </Row>
        )
    } else if(profile.roles.admin){
        return  <AdminFooter tour={tour} onOk={onOk} publishTour={publishTour} unpublishTour={unpublishTour} toggleDrawer={toggleDrawer}/>
    } else if (tour.assignedGuideIds.includes(userId)) {
        return <DropTourFooter tour={tour} dropSelfFromTour={dropSelfFromTour} onOk={onOk}/>;
    } else if (tour.numberOfGuidesRequested > tour.assignedGuides.length) {
        return <ProvideCoverageFooter tour={tour} addSelfToTour={addSelfToTour} onOk={onOk}/>;
    } else {
        return null
    }
};

export default TourAssignmentFooter;