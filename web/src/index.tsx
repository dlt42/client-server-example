import App from './App';
import * as React from 'react';
import { render } from 'react-dom';
import { MessageClientHttp } from './client';

const messageClient = new MessageClientHttp('http://localhost:5002');

render(<App messageClient={messageClient} />, document.getElementById('root'));
