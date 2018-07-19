import React from 'react';

import store from './store.js';
import createAction from './action.js';
import {
    CREATE_NOTE,
    UPDATE_NOTE,
    OPEN_NOTE,
    CLOSE_NOTE
} from './constants.js';
import { create } from 'domain';

const NoteEditor = ({
    note,
    onChangeNote,
    onCloseNote
}) => (
    <div>
        <div>
            <textarea
                className="editor-content"
                autoFocus
                value={note.content}
                onChange={event => onChangeNote(note.id, event.target.value)}
                cols={80}
                rows={10}
            />
        </div>
        <button className="editor-button" onClick={onCloseNote}>Close</button>
    </div>
);

const NoteTitle = ({
    note
}) => {
    const title = note.content.split('\n')[0].replace(/^\s+|\s+$/g, '');
    
    if (title === '') {
        return <i>Untitled</i>;
    }

    return <span>{title}</span>;
};

const NoteLink = ({
    note,
    onOpenNote
}) => (
    <li className="note-list-item">
        <a href="#" onClick={() => onOpenNote(note.id)}>
            <NoteTitle note={note} />
        </a>
    </li>
);

const NoteList = ({
    notes,
    onOpenNote
}) => (
    <ul className="note-list">
    {
        Object.keys(notes).map(id =>
            <NoteLink
            key={id}
            note={notes[id]}
            onOpenNote={onOpenNote}
            />
        )
    }
    </ul>
);

const NoteApp = ({
    notes,
    openNoteId,
    onAddNote,
    onChangeNote,
    onOpenNote,
    onCloseNote
}) => (
    <div>
        {
            openNoteId ?
                <NoteEditor
                    note={notes[openNoteId]}
                    onChangeNote={onChangeNote}
                    onCloseNote={onCloseNote}
                /> :
                <div>
                    <NoteList notes={notes} onOpenNote={onOpenNote} />
                    <button className="editor-button" onClick={onAddNote}>New Note</button>
                </div>
        }
    </div>
);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.store.getState();
        this.onAddNote = this.onAddNote.bind(this);
        this.onChangeNote = this.onChangeNote.bind(this);
        this.onOpenNote = this.onOpenNote.bind(this);
        this.onCloseNote = this.onCloseNote.bind(this);
    }
    
    componentWillMount() {
        this.unsubscribe = this.props.store.subscribe(() => {
            this.setState(this.props.store.getState());
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onAddNote() {
        this.props.store.dispatch(createAction(CREATE_NOTE));
    }

    onChangeNote(id, content) {
        this.props.store.dispatch(createAction(UPDATE_NOTE, id, content));
    }

    onOpenNote(id) {
        this.props.store.dispatch(createAction(OPEN_NOTE, id));
    }

    onCloseNote() {
        this.props.store.dispatch(createAction(CLOSE_NOTE));
    }

    render() {
        return (
            <NoteApp
                {...this.state}
                onAddNote={this.onAddNote}
                onChangeNote={this.onChangeNote}
                onOpenNote={this.onOpenNote}
                onCloseNote={this.onCloseNote}
            />
        )
    }
}