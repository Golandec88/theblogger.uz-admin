import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App';
import configureStore from './store/configure-store';
import './assets/index.less';

ReactDOM.render(
    <Provider store={configureStore}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
