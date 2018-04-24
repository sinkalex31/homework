import React from 'react';
import { DotLoader } from 'react-spinners';

import './_Spinner.scss';

const Spinner = () => (
    <div className="loader">
        <DotLoader
            loading={true}
            size={50}
            color={'#007bff'}
        />
    </div>
);

export default Spinner;