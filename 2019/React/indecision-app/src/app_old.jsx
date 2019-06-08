/* eslint-disable react/react-in-jsx-scope */
console.log('App.js is running');

const app = {
  title: 'Epic',
  subtitle: 'gamer',
  options: [],
};

const onFormSubmit = (event) => {
  event.preventDefault();
  const option = event.target.elements.option.value;
  if (!option) return;
  app.options.push(option);
  event.target.elements.option.value = '';
  reRender();
};

const removeAll = () => {
  app.options = [];
  reRender();
}

const makeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  alert(option);
}

const root = document.getElementById('app');

const reRender = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <h3>{app.subtitle}</h3>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
      <button disabled={app.options.length === 0} onClick={makeDecision}>What should I do?</button>
      <button onClick={removeAll}>Remove All</button>
      <ul>
        { app.options.map((opt, i) => <li key={i}>{opt}</li>) }
      </ul>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
    </div>
  );
  ReactDOM.render(template, root);
}

reRender();
