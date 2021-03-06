import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
  type: 'ADD_EXPENSE',
  expense: { id: uuid(), description, note, amount, createdAt, },
});
// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({ type: 'REMOVE_EXPENSE', id, });
// EDIT_EXPENSE
const editExpense = (id, updates) => ({ type: 'EDIT_EXPENSE', id, updates, });
// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({ type: 'SET_TEXT_FILTER', text, });
// SORT_BY_DATE
const sortByDate = () => ({ type: 'SORT_BY_DATE', });
// SORT_BY_AMOUNT
const sortByAmount = () => ({ type: 'SORT_BY_AMOUNT', });
// SET_START_DATE
const setStartDate = startDate => ({ type: 'SET_START_DATE', startDate, });
// SET_END_DATE
const setEndDate = endDate => ({ type: 'SET_END_DATE', endDate, });

// Expenses reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [ ...state, action.expense ];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map(expense => 
        (expense.id === action.id) ? { ...expense, ...action.updates } : expense
      );
    default:
      return state;
  }
};

// Filters reducer
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return { ...state, text: action.text, };
    case 'SORT_BY_AMOUNT':
      return { ...state, sortBy: 'amount', };
    case 'SORT_BY_DATE':
      return { ...state, sortBy: 'date', };
    case 'SET_START_DATE':
      return { ...state, startDate: action.startDate, };
    case 'SET_END_DATE':
      return { ...state, endDate: action.endDate, };
    default:
      return state;
  }
}

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter(expense => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    return startDateMatch && endDateMatch && textMatch;
  }).sort((exp1, exp2) => {
    if (sortBy === 'amount') 
      return (exp1.amount < exp2.amount) ? 1 : -1;
    return (exp1.createdAt < exp2.createdAt) ? 1 : -1;
  });
}

// Store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
})

const exp1 = store.dispatch(addExpense({ description: 'rent', amount: 10000, createdAt: -1000, }));
const exp2 = store.dispatch(addExpense({ description: 'coffee', amount: 2000, createdAt: -100, }));

// store.dispatch(removeExpense({ id: exp1.expense.id }));
// store.dispatch(editExpense(exp2.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(900));

const demoState = {
  expenses: [{
    id: 'fdgsgdsfgsdf',
    description: 'January Rent',
    note: 'Final payment',
    amount: 54500,
    createdAt: 0,
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined,
  },
};
