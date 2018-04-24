import _ from 'lodash';

const createReducer = (functions, initialState) => {
    if (!_.isPlainObject(functions)) throw new Error('Argument "functions" can only be a plain object');

    return (state = initialState, { type, payload }) => (
        functions[type] ? functions[type](state, payload) : state
    );
};

export default createReducer;