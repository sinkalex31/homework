import React from 'react';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { lifecycle } from 'recompose';
import { Row, Col } from 'reactstrap';

import { CustomerPropTypes } from 'utils/propTypes';
import { loader } from 'hocs';
import { currentCustomerSelector } from 'store/selectors';
import { fetchCustomer } from 'store/actions';
import { SimpleMap, CustomerInfo } from 'components';

const mapStateToProps = createPropsSelector({
    customer: currentCustomerSelector,
});

const withData = lifecycle({
    componentDidMount() {
        const { dispatch, match: { params: { id }} } = this.props;
        dispatch(fetchCustomer({ id }));
    }
});

const CustomerInfoPage = ({ customer }) => (
    <Row>
        <Col md={{ size: 8, offset: 2 }}>
            <CustomerInfo customer={customer} />
            <SimpleMap
                coordinates={JSON.parse(customer.metadata.coordinates)}
            />
        </Col>
    </Row>
);

CustomerInfoPage.propTypes = {
    customer: CustomerPropTypes.isRequired,
};

const isLoading =  ({ customer, match: { params: { id }}}) => (
    !customer || customer.id !== id
);

const CustomerInfoPageWithLoading = loader({
    withData,
    isLoading,
})(CustomerInfoPage);

export default connect(mapStateToProps)(CustomerInfoPageWithLoading);