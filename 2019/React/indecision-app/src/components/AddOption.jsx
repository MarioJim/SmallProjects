import React from 'react';

export default class AddOption extends React.Component {
  state = {
    error: undefined,
  };

  handleAddOption = event => {
    event.preventDefault();
    const newOption = event.target.elements.newOption.value.trim();
    const { handleAddOption } = this.props;
    const error = handleAddOption(newOption);
    this.setState(() => ({ error }));
    // eslint-disable-next-line no-param-reassign
    if (!error) event.target.elements.newOption.value = '';
  };

  render() {
    const { error } = this.state;
    return (
      <div>
        {error && <p className="add-option__error">{error}</p>}
        <form onSubmit={this.handleAddOption} className="add-option">
          <input type="text" name="newOption" className="add-option__input" />
          <button type="submit" className="button">
            Add Option
          </button>
        </form>
      </div>
    );
  }
}
