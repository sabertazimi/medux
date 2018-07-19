import {
    CREATE_NOTE,
    UPDATE_NOTE
} from './constants.js';

const initialState = {
    nextNoteId: 1,
    notes: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NOTE: {
            const id = state.nextNoteId;
            const newNote = {
                id,
                content: ''
            };

            return {
                ...state,
                nextNoteId: id + 1,
                notes: {
                    ...state.notes,
                    [id]: newNote
                }
            };
        }
        case UPDATE_NOTE: {
            const { id, content } = action.payload;
            const editedNote = {
                ...state.notes[id],
                content
            };

            return {
                ...state,
                notes: {
                    ...state.notes,
                    [id]: editedNote
                }
            };
        }
        default:
            return state;
    }
};

export default reducer;