import React from 'react';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { lifecycle } from 'recompose';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CustomerPropTypes } from 'utils/propTypes';
import { loader } from 'hocs';
import { customerListSelector, isEmptyListSelector } from 'store/selectors';
import { fetchCustomerList, removeCustomerRequest } from 'store/actions';
import { CustomerList } from 'components';

const mapStateToProps = createPropsSelector({
    customers: customerListSelector,
    isEmpty: isEmptyListSelector,
});

const withData = lifecycle({
    componentDidMount() {
        this.props.dispatch(fetchCustomerList());
    }
});

const CustomersPage = ({ customers, isEmpty, dispatch }) => (
    !isEmpty ?
        <CustomerList
            customers={customers}
            removeCustomer={(id) => dispatch(removeCustomerRequest({ id }))}
        />
        : <div>You customer list is empty <Link to="/create">please add one.</Link></div>
);

CustomersPage.propTypes = {
    customers: PropTypes.arrayOf(CustomerPropTypes).isRequired,
    isEmpty: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
};

const isLoading =  ({ customers, isEmpty }) => !customers.length && !isEmpty;

const CustomersPageWithLoading = loader({
    withData,
    isLoading,
})(CustomersPage);

export default connect(mapStateToProps)(CustomersPageWithLoading);