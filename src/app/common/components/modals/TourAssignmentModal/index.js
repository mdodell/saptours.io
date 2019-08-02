import React from 'react';
import { Modal } from 'antd';

const TourAssignmentModal = ({onCancel, onOk, tour, visible}) => {
    console.log(tour);
    return (
        <div>
            <Modal
                title={tour && tour.content}
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
            >
                <p>Please show up to your tour 15 minutes before the tour! The other tour guides giving this tour will be {tour && tour.guideIds.join(", ")}</p>
            </Modal>
        </div>
    );
};

export default TourAssignmentModal;
