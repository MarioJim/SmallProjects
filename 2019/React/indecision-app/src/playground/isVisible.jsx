/* eslint-disable react/react-in-jsx-scope */
console.log('epic');

let isVisible = true;

const changeVisibility = () => {
  isVisible = !isVisible;
  reRender();
}

const root = document.getElementById('app');

const reRender = () => {
  const template = (
    <div>
      <h1>Visibility Toggle</h1>
      <button
        type="button" 
        onClick={changeVisibility}
      >
        {isVisible ? 'Hide details' : 'Show details'}
      </button>
      {isVisible && <p>Hey. These are some details you can now see!</p>}
    </div>
  );
  ReactDOM.render(template, root);
}

reRender();