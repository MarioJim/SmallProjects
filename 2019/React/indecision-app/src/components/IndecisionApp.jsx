import React from 'react';

import Action from './Action';
import AddOption from './AddOption';
import Header from './Header';
import Options from './Options';

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      if (json === null) return;
      const options = JSON.parse(json);
      this.setState(() => ({ options }));
    } catch (error) {
      console.error(error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { options } = this.state;
    if (prevState.options.length === options.length) return;
    const json = JSON.stringify(options);
    localStorage.setItem('options', json);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  }

  handlePick = () => {
    const { options } = this.state;
    const randNum = Math.floor(Math.random() * options.length);
    const randOption = options[randNum];
    window.alert(randOption);
  }

  handleAddOption = option => {
    if (!option)
      return 'Enter valid value to add item';
    const { options } = this.state;
    if (options.includes(option)) 
      return 'This element already exists';

    this.setState(prevState => ({ options: prevState.options.concat(option) }));
    return undefined;
  }

  handleDeleteOption = optionToRemove => {
    this.setState(prevState => ({
      options: prevState.options.filter(option => option !== optionToRemove)
    }));
  }

  render() {
    const subtitle = 'Put your life in the hands of a computer';
    const { options } = this.state;
    return (
      <div>
        <Header subtitle={ subtitle } />
        <Action 
          hasOptions={ options.length > 0 }
          handlePick={ this.handlePick }
        />
        <Options 
          options={options}
          handleDeleteOptions={ this.handleDeleteOptions }
          handleDeleteOption={ this.handleDeleteOption }
        />
        <AddOption 
          handleAddOption={ this.handleAddOption }
        />
      </div>
    );
  }
}
