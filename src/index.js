import React from 'react';
import ReactDOM from 'react-dom';

import store from './store.js';
import createAction from './action.js';
import {
    CREATE_NOTE,
    UPDATE_NOTE
} from './constants.js';

import App from './App.js';

import './index.css';

store.subscribe(() => {
    ReactDOM.render((
        <App />
    ), document.getElementById('root'));
});

store.dispatch(createAction(CREATE_NOTE));
store.dispatch(createAction(UPDATE_NOTE, 1, 'Hello React'));
store.dispatch(createAction(CREATE_NOTE));
store.dispatch(createAction(UPDATE_NOTE, 2, 'Hello Medux'));
