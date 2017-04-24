import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { maps } from './reducers/index';
import App from './App';
import './styles/index.css';
import 'react-select/dist/react-select.css';

const store = applyMiddleware(thunk)(createStore)(combineReducers({maps}));

const root = document.getElementById('root');

if(root) {
  ReactDOM.render(
    <Provider store={store}>
    	<App></App>
    </Provider>,
    document.getElementById('root')
  );
}
