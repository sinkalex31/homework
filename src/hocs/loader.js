import React from 'react';
import { compose, branch, renderComponent, lifecycle } from 'recompose';

import Spinner from 'components/Spinner/Spinner';

const withSpinnerWhileLoading = isLoading => branch(
    isLoading,
    renderComponent(Spinner)
);

const loader = ({ withData = lifecycle({}), isLoading }) => compose(
    withData,
    withSpinnerWhileLoading(isLoading)
);

export default loader;