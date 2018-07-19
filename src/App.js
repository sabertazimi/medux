import React from 'react';

import store from './store.js';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        console.log('> componentDidUpdate ...');
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