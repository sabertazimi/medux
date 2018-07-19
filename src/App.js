import React from 'react';

import store from './store.js';
import createAction from './action.js';
import {
    CREATE_NOTE,
    UPDATE_NOTE
} from './constants.js';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        store.dispatch(createAction(CREATE_NOTE));
        store.dispatch(createAction(UPDATE_NOTE, 1, 'Hello React'));
        store.dispatch(createAction(CREATE_NOTE));
        store.dispatch(createAction(UPDATE_NOTE, 2, 'Hello Medux'));
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