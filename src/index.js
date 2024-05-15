import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import "./styles.css"
import {Provider} from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import reducer from "./store";

import { ToastContainer } from "react-toastify";

const store = configureStore({ reducer });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
        <ToastContainer />
      </React.StrictMode>
  </BrowserRouter>
  
);