import React from 'react';
import { Row, Button} from 'antd';

const ProvideCoverageFooter = ({tour, onOk, addSelfToTour}) => {
    return (
        <Row type="flex" justify="end">
            <Button type="primary" icon="star" onClick={() => {
                addSelfToTour(tour);
                onOk();
            }}>Provide Coverage</Button>
        </Row>
    );
};

export default ProvideCoverageFooter;