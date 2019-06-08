/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prefer-stateless-function */

class IsVisible extends React.Component {
  constructor(props) {
    super(props);
    this.changeVisibility = this.changeVisibility.bind(this);
    this.state = {
      visible: false,
    }
  }

  changeVisibility() {
    this.setState(prevState => {
      return {
        visible: !prevState.visible,
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Visibility Toggle</h1>
        <button onClick={this.changeVisibility}>{this.state.visible ? 'Hide details' : 'Show details'}</button>
        {this.state.visible && <p>Hey. These are some details you can now see!</p>}
    </div>
    );
  }

}

ReactDOM.render(<IsVisible />, document.getElementById('app'));