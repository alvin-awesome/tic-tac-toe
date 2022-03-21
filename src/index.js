import React from 'react';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import fakeApi from './server/game';
import reportWebVitals from './reportWebVitals';
import { gameApis } from './services';

fakeApi();

ReactDOM.render(
  <React.StrictMode>
    <ApiProvider api={gameApis}>
      <App />
    </ApiProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
