import React from 'react';
import { Row, Button } from 'antd';

const DropTourFooter = ({tour, dropSelfFromTour, onOk}) => {
    return (
        <Row type="flex" justify="end">
            <Button type="danger" icon="delete" onClick={() => {
                dropSelfFromTour(tour);
                onOk()
            }}>Drop Tour</Button>
        </Row>
    )
};

export default DropTourFooter;