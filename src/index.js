import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import { storeReducer } from './redux/reducer';
import reportWebVitals from './reportWebVitals';
import "./css/style.css";

const store = createStore(storeReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
