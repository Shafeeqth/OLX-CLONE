import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FirebaseContext } from './store/Context';
import {db} from './firebase/config'
import  Context  from './store/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FirebaseContext.Provider value={{db}}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider >
);
