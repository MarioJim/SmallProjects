import React from 'react';

import Option from './Option';

const Options = ({ handleDeleteOption, handleDeleteOptions, options }) => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">Your Options</h3>
      <button
        onClick={ handleDeleteOptions }
        type="button"
        className="button button--link"
      >
        Remove All
      </button>
    </div>
    { options.length === 0 && 
      <p className="widget__message">Please add an option to get started </p> }
    { options.map((elem, index) => (
      <Option
        key={ elem }
        optionText={ elem }
        count={ index + 1 }
        handleDeleteOption={ handleDeleteOption }
      />
    )) }
  </div>
);

export default Options;
