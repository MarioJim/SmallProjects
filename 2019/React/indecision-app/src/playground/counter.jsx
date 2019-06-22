/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prefer-stateless-function */

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    const savedNum = localStorage.getItem('count');
    if (isNaN(savedNum)) return;
    const count = parseInt(savedNum, 10);
    this.setState(() => ({ count }));
  }

  componentDidUpdate(prevState) {
    if (this.state.count === prevState.count) return;
    localStorage.setItem('count', this.state.count);
  }

  handleAddOne() {
    this.setState(prevState => {
      return {
        count: prevState.count + 1,
      };
    });
  }

  handleMinusOne() {
    this.setState(prevState => {
      return {
        count: prevState.count - 1,
      };
    });
  }

  handleReset() {
    this.setState({
      count: 0,
    });
  }

  render() {
    return (
      <div>
        <h1>Count: { this.state.count }</h1>
        <button type="button" onClick={this.handleAddOne}>+1</button>
        <button type="button" onClick={this.handleMinusOne}>-1</button>
        <button type="button" onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById('app'));
