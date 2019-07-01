import React from 'react';

import Action from './Action';
import AddOption from './AddOption';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined,
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      if (json === null) return;
      const options = JSON.parse(json);
      this.setState(() => ({ options, }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { options } = this.state;
    if (prevState.options.length === options.length) return;
    const json = JSON.stringify(options);
    localStorage.setItem('options', json);
  }

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [], }));
  }

  handlePick = () => {
    const { options } = this.state;
    const randNum = Math.floor(Math.random() * options.length);
    const selectedOption = options[randNum];
    this.setState(() => ({ selectedOption, }));
  }

  handleAddOption = option => {
    if (!option)
      return 'Enter valid value to add item';
    const { options } = this.state;
    if (options.includes(option)) 
      return 'This element already exists';

    this.setState(prevState => ({ options: prevState.options.concat(option), }));
    return undefined;
  }

  handleDeleteOption = optionToRemove => {
    this.setState(prevState => ({
      options: prevState.options.filter(option => option !== optionToRemove),
    }));
  }

  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined, }));
  }

  render() {
    const subtitle = 'Put your life in the hands of a computer';
    const { options, selectedOption } = this.state;
    return (
      <div>
        <Header subtitle={ subtitle } />
        <div className="container">
          <Action 
            hasOptions={ options.length > 0 }
            handlePick={ this.handlePick }
          />
          <div className="widget">
            <Options 
              options={ options }
              handleDeleteOptions={ this.handleDeleteOptions }
              handleDeleteOption={ this.handleDeleteOption }
            />
            <AddOption 
              handleAddOption={ this.handleAddOption }
            />
          </div>
        </div>
        <OptionModal
          selectedOption={ selectedOption }
          handleClearSelectedOption={ this.handleClearSelectedOption }
        />
      </div>
    );
  }
}
