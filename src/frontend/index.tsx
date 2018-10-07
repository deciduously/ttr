import { h, render } from 'preact';
import App from './components/App';
import { AppState } from './store/AppState';

const store = new AppState();

render(
  <App store={store} />,
  document.querySelector('#app')
);