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
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.state = {
      options: props.options
    }
  }

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
    if (prevState.options.length === this.state.options.length) return;
    const json = JSON.stringify(this.state.options);
    localStorage.setItem('options', json);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  handleDeleteOptions() {
    this.setState(() => ({ options: [] }));
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

    this.setState(prevState => ({ options: prevState.options.concat(option) }));
  }

  handleDeleteOption(optionToRemove) {
    this.setState(prevState => ({
      options: prevState.options.filter(option => option !== optionToRemove)
    }));
  }

  render() {
    const subtitle = 'Put your life in the hands of a computer';
    return (
      <div>
        <Header subtitle={subtitle} />
        <Action 
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options 
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption 
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
};

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      { props.subtitle && <h2>{props.subtitle}</h2> }
    </div>
  );
};

Header.defaultProps = {
  title: "Indecision"
}

const Action = props => {
  return (
    <button 
      onClick={props.handlePick} 
      disabled={!props.hasOptions} 
      type="button"
    >
      What should I do?
    </button>
  );
};

const Options = props => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions} type="button">Remove All</button>
      { props.options.length === 0 ? 
        <p>Please add an option to get started</p> :
        <p>There are {props.options.length} options</p> }
      <ul>
        { props.options.map((elem, i) => (
          <Option
            key={i}
            optionText={elem}
            handleDeleteOption={props.handleDeleteOption}
          />
        )) }
      </ul>
    </div>
  );
};

const Option = props => {
  return (
    <li>
      {props.optionText}
      <button
        type="button"
        onClick={e => {
          props.handleDeleteOption(props.optionText);
        }}
      >Remove
      </button>
    </li>
  );
};

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
    const error = this.props.handleAddOption(newOption);
    this.setState(() => ({ error, }));
    if (!error) event.target.elements.newOption.value = "";
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

// const User = props => {
//   return (
//     <div>
//       <p>Name: {props.name}</p>
//       <p>Age: {props.age}</p>
//     </div>
//   )
// };

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
