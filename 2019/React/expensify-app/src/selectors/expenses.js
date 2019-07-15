import moment from 'moment';

export default (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter(expense => {
    const createdAtMoment = moment(expense.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    
    return startDateMatch && endDateMatch && textMatch;
  }).sort((exp1, exp2) => {
    if (sortBy === 'amount') 
      return (exp1.amount < exp2.amount) ? 1 : -1;
    return (exp1.createdAt < exp2.createdAt) ? 1 : -1;
  });
}
