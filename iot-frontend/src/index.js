import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <Layout />
    </BrowserRouter>, 
    document.getElementById('root')
);

registerServiceWorker();