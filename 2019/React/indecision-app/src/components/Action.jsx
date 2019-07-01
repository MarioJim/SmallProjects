import React from 'react';

const Action = ({ handlePick, hasOptions }) => (
  <button 
    onClick={ handlePick }
    disabled={ !hasOptions }
    type="button"
    className="big-button"
  >
    What should I do?
  </button>
);

export default Action;
