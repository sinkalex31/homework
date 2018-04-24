import PropTypes from 'prop-types';

export const CustomerPropTypes = PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    metadata: PropTypes.shape({
        fullName: PropTypes.string,
        formatted: PropTypes.string,
    }),
});