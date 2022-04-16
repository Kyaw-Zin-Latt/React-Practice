import React from 'react';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/venobox/dist/venobox.min'
import './custom'
import './style.css';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    
      <App />
   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

