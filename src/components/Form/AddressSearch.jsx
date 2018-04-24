import React, { Component } from 'react';
import _ from 'lodash';

import { searchAddress } from 'utils/utils.api';
import Select from './Select/Select';

export default class AddressSearch extends Component {
    state = {
        options: [],
        loading: false,
    };

    onSearch = _.debounce(async (input) => {
        if (!input) {
            return this.setState({
                loading: false,
                options: [],
            });
        }

        this.setState({
            loading: true,
        });

        const options = await searchAddress(input);

        this.setState({
            loading: false,
            options,
        });
    }, 300);

    render() {
        const { input, meta, label, ...rest } = this.props;
        const { options, loading } = this.state;

        return (
            <Select
                {...rest}
                input={input}
                meta={meta}
                label={label}
                busy={loading}
                options={options}
                textField="formatted"
                filter={() => true}
                onSearch={this.onSearch}
            />
        );
    }
}