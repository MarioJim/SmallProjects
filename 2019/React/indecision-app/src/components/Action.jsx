import React from 'react';

const Action = ({ handlePick, hasOptions }) => {
  return (
    <button 
      onClick={ handlePick }
      disabled={ !hasOptions }
      type="button"
    >
      What should I do?
    </button>
  );
};

export default Action;
