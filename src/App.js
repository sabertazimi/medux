import React from 'react';

import store from './store.js';

const NoteEditor = ({
    note,
    onChangeNote,
    onCloseNote
}) => {
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
};

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
}) => {
    <li className="note-list-item">
        <a href="#" onClick={() => onOpenNote(note.id)}>
            <NoteTitle note={note} />
        </a>
    </li>
};

const NoteList = ({
    notes,
    onOpenNote
}) => {
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
};

const NoteApp = ({
    notes,
    openNoteId,
    onAddNote,
    onChangeNote,
    onOpenNote,
    onCloseNote
}) => {
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
};

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