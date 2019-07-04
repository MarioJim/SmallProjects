import React from 'react';

const EditExpensePage = props => {
  console.log(props);
  const { match } = props;
  const { params } = match;
  return (
    <div>
      <p>This is from my edit expense component</p>
      <p>Editing the expense with the id of {params.id}</p>
    </div>
  );
};

export default EditExpensePage;
