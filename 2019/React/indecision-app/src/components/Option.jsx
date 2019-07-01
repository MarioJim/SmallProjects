import React from 'react';

const Option = ({ optionText, handleDeleteOption, count }) => (
  <div className="option">
    <p className="option__text">{ count }. { optionText }</p>
    <button
      type="button"
      onClick={() => {
        handleDeleteOption(optionText);
      }}
      className="button button--link"
    >
      Remove
    </button>
  </div>
);

export default Option;
