/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/react-in-jsx-scope */

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      options: [],
    }
  }

  handleDeleteOptions() {
    this.setState(() => {
      return {
        options: [],
      };
    });
  }

  handlePick() {
    const randNum = Math.floor(Math.random() * this.state.options.length);
    const randOption = this.state.options[randNum];
    alert(randOption);
  }

  handleAddOption(option) {
    if (!option)
      return 'Enter valid value to add item';
    if (this.state.options.includes(option)) 
      return 'This element already exists';

    this.setState(prevState => {
      return {
        options: prevState.options.concat(option),
      };
    });
  }

  render() {
    const title = 'Indecision';
    const subtitle = 'Put your life in the hands of a computer';
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action 
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options 
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
        />
        <AddOption 
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
}

class Action extends React.Component {
  render() {
    return (
      <button 
        onClick={this.props.handlePick} 
        disabled={!this.props.hasOptions} 
        type="button"
      >
        What should I do?
      </button>
    );
  }
}

class Options extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handleDeleteOptions} type="button">Remove All</button>
        <p>There are {this.props.options.length} options</p>
        <ul>
          { this.props.options.map((elem, i) => <Option key={i} optionText={elem} />) }
        </ul>
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return <li>{this.props.optionText}</li>;
  }
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined,
    };
  }

  handleAddOption(event) {
    event.preventDefault();
    const newOption = event.target.elements.newOption.value.trim();
    event.target.elements.newOption.value = "";
    const error = this.props.handleAddOption(newOption);
    this.setState(() => {
      return { error, };
    });
  }

  render() {
    return (
      <div>
        {
          this.state.error && 
          <p>{this.state.error}</p>
        }
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="newOption" />
          <button type="submit">Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));