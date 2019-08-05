import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';

import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';

class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null,
  };

  onDatesChange = ({ startDate, endDate }) => {
    const { dispatch } = this.props;
    dispatch(setStartDate(startDate));
    dispatch(setEndDate(endDate));
  }

  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused, }));
  }

  render() {
    const { filters, dispatch } = this.props;
    const { calendarFocused } = this.state;
    return (
      <div>
        <input type="text" value={filters.text} onChange={event => {
          dispatch(setTextFilter(event.target.value));
        }} />
        <select value={filters.sortBy} onChange={event => {
          if (event.target.value === 'date')
            dispatch(sortByDate());
          else if (event.target.value === 'amount')
            dispatch(sortByAmount());
        }}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startDate={filters.startDate}
          endDate={filters.endDate}
          startDateId="startDateId"
          endDateId="endDateId"
          onDatesChange={this.onDatesChange}
          focusedInput={calendarFocused}
          onFocusChange={this.onFocusChange}
          showClearDates
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    filters: state.filters,
  };
};

export default connect(mapStateToProps)(ExpenseListFilters);
