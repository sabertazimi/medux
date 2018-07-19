import {
    CREATE_NOTE,
    UPDATE_NOTE
} from './constants.js';

const createAction = (type, ...args) => {
    switch (type) {
        case CREATE_NOTE:
            return {
                type
            };
        case UPDATE_NOTE:
            return {
                type,
                payload: {
                    id: args[0],
                    content: args[1]
                }
            };
        default:
            return {
                type: undefined,
                payload: new Error('Unknown action type'),
                error: true
            };
    }
};

export default createAction;