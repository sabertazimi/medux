import React from 'react';

import store from './store.js';
import {
    createNote,
    updateNote
} from './action.js';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        store.dispatch(createNote());
        store.dispatch(updateNote(1, 'Hello React'));
        store.dispatch(createNote());
        store.dispatch(updateNote(2, 'Hello Medux'));
    }

    render() {
        const { notes } = store.getState();

        return (
            <div>
                React x Medux
                <ul>
                    {
                        Object.values(notes).map((note) => {
                            return <li key={note.id}>{note.content}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}