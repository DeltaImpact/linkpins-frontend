import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './helpers';
import { App } from './containers/App';

import { signalRRegistration } from './middleware/signalRRegistration';
// import '../node_modules/materialize-css/dist/css/materialize.min.css';
// import '../node_modules/materialize-css/dist/js/materialize.min.js';
signalRRegistration(store);
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);