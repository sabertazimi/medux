import React from 'react';
import ReactDOM from 'react-dom';

import store from './store.js';
import App from './App.js';

import './index.css';

ReactDOM.render((
    <App store={store} />
), document.getElementById('root'));