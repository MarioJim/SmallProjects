import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';

import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import './styles/styles.scss';

import { addExpense } from './actions/expenses';
import getVisibleExpenses from './selectors/expenses';

const store = configureStore();

store.dispatch(addExpense({ description: 'Water bill', amount: 1000, createdAt: 102013, }));
store.dispatch(addExpense({ description: 'Gas bill', amount: 200, createdAt: 111111, }));
store.dispatch(addExpense({ description: 'Rent', amount: 800, createdAt: 123456, }));

console.log(getVisibleExpenses(store.getState().expenses, store.getState().filters));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
