import {
    validateAction
} from './action.js';

const createStore = (reducer) => {
    // clousre for storing global state
    let state = undefined;

    return {
        dispatch: (action) => {
            validateAction(action);
            state = reducer(state, action);
        },
        getState: () => state
    };
};

export {
    createStore
};