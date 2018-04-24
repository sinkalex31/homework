import React from 'react';
import { Row, Col } from 'reactstrap';

import { CustomerForm } from 'components';

const CustomerCreatePage = () => (
    <Row>
        <Col md={{ size: 8, offset: 2 }}>
            <CustomerForm />
        </Col>
    </Row>
);

export default CustomerCreatePage;