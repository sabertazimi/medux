import {
    validateAction
} from './action.js';
import {
    INIT_MEDUX
} from './constants.js';

const createStore = (reducer) => {
    // clousre for storing global state
    let state = undefined;
    const subscribers = [];
    const store = {
        dispatch: (action) => {
            validateAction(action);

            switch (action.type) {
                case INIT_MEDUX:
                    console.log('> initializing medux ...');
            }

            state = reducer(state, action);
            subscribers.forEach(handler => handler());
        },
        getState: () => state,
        subscribe: (handler) => {
            subscribers.push(handler);

            // unsubscribe function
            return () => {
                const index = subscribers.indexOf(handler);

                if (index > 0) {
                    subscribers.splice(index, 1);
                }
            };
        }
    };

    store.dispatch({
        type: INIT_MEDUX
    });
    return store;
};

export {
    createStore
};