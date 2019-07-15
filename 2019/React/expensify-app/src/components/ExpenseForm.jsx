import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const now = moment();
console.log(now.format('MMM Do, YYYY'));

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? props.expense.amount / 100 : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: '',
    };
  }

  onDescriptionChange = event => {
    const description = event.target.value;
    this.setState(() => ({ description, }));
  }

  onNoteChange = event => {
    const note = event.target.value;
    this.setState(() => ({ note, }));
  }

  onAmountChange = event => {
    const amount = event.target.value;
    if (!amount || amount.match(/^\d+\.?\d?\d?$/))
      this.setState(() => ({ amount, }));
  }

  onDateChange = createdAt => {
    if (createdAt)
      this.setState(() => ({ createdAt, }));
  }

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused, }));
  }

  onSubmit = event => {
    event.preventDefault();
    const { description, amount, note, createdAt } = this.state;
    if (!description || !amount) {
      this.setState(() => ({ error: 'Please provide description and amount', }));
    } else {
      this.setState(() => ({ error: '', }));
      // eslint-disable-next-line react/destructuring-assignment
      this.props.onSubmit({
        description,
        amount: parseFloat(amount) * 100,
        createdAt: createdAt.valueOf(),
        note,
      })
    }
  }

  render () {
    const { description, amount, createdAt, calendarFocused, note, error } = this.state;
    return (
      <div>
        { error && <p>{error}</p> }
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={this.onDescriptionChange}
          /><br />
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={this.onAmountChange}
          /><br />
          <SingleDatePicker
            date={createdAt}
            onDateChange={this.onDateChange}
            focused={calendarFocused}
            onFocusChange={this.onFocusChange}
            id="datepicker"
            numberOfMonths={1}
            isOutsideRange={() => false}
          /><br />
          <textarea
            placeholder="Add a note for your expense (optional)"
            value={note}
            onChange={this.onNoteChange}
          ></textarea><br />
          <button
            type="submit"
          >Add expense</button>
        </form>
      </div>
    );
  };
}
