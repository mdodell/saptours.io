import React from 'react';
import { Row, Button } from 'antd';

const AdminFooter = ({tour, onOk, publishTour, unpublishTour, toggleDrawer}) => {
    return (
        <Row type="flex" justify="end" align="middle" gutter={16}>
            {!tour.published && <Button type="primary" icon="edit" onClick={() => {
                publishTour(tour);
                onOk();
            }}>Publish Tour</Button>}
            {tour.published && <Button type="primary" icon="delete" onClick={() => {
                unpublishTour(tour);
                onOk();
            }}>Unpublish Tour</Button>}
            <Button type="primary" icon="edit" onClick={() => toggleDrawer()}>Edit Tour</Button>
        </Row>
    );
};

export default AdminFooter;