import { h, render } from 'preact';
import App from './components/App';
import { AppStore } from './store/AppStore';

const store = new AppStore();

render(
  <App store={store} />,
  document.querySelector('#app') as HTMLElement
);