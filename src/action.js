import {
    CREATE_NOTE,
    UPDATE_NOTE
} from './constants.js';

const createNote = () => {
    return {
        type: CREATE_NOTE
    };
}

const updateNote = (id, content) => {
    return {
        type: UPDATE_NOTE,
        payload: {
            id,
            content
        }
    };
}

export {
    createNote,
    updateNote
};