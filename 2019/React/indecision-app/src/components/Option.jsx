import React from 'react';

const Option = ({ optionText, handleDeleteOption }) => {
  return (
    <li>
      { optionText }
      <button
        type="button"
        onClick={() => {
          handleDeleteOption(optionText);
        }}
      >
        Remove
      </button>
    </li>
  );
};

export default Option;
