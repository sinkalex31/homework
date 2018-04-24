import React from 'react';
import { ListGroup } from 'reactstrap';
import PropTypes from 'prop-types';

import { CustomerPropTypes } from 'utils/propTypes';
import CustomerListItem from './CustomerListItem';

const CustomerList = ({ customers, removeCustomer }) => (
    <ListGroup>
        {customers.map((customer) => (
            <CustomerListItem
                key={customer.id}
                customer={customer}
                removeCustomer={removeCustomer}
            />
        ))}
    </ListGroup>
);

CustomerList.propTypes = {
    customers: PropTypes.arrayOf(CustomerPropTypes).isRequired,
    removeCustomer: PropTypes.func.isRequired,
};

export default CustomerList;