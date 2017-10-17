import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';

import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux'

import reducer from './reducers';
import thunkMiddleware from "redux-thunk";
import { fetchPosts, fetchCategories } from './actions'

const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunkMiddleware, middleware))
);

store.dispatch(fetchPosts());
store.dispatch(fetchCategories());

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
