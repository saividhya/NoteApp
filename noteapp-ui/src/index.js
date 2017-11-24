import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<CookiesProvider><App /></CookiesProvider>, document.getElementById('root'));
registerServiceWorker();
