import React from 'react';

import Option from './Option';

const Options = ({ handleDeleteOption, handleDeleteOptions, options }) => {
  return (
    <div>
      <button
        onClick={ handleDeleteOptions }
        type="button"
      >
        Remove All
      </button>
      { options.length === 0 ? 
        <p>Please add an option to get started</p> :
        <p>There are { options.length } options</p> }
      <ul>
        { options.map(elem => (
          <Option
            key={ elem }
            optionText={ elem }
            handleDeleteOption={ handleDeleteOption }
          />
        )) }
      </ul>
    </div>
  );
};

export default Options;
