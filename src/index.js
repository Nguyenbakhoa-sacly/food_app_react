import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter } from 'react-router-dom'
import myReducer from './context/reducers';
const myStore = createStore(myReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AnimatePresence>
        <Provider store={myStore}>
          <App />
        </Provider>
      </AnimatePresence>
    </BrowserRouter>
  </React.StrictMode>
);

