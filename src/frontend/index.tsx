import { h, render } from 'preact';
import App from './components/App/App';
import { AppStore } from './store/AppStore';

const store = new AppStore();

render(
    <App store={store} />,
    // <HTMLElement>document.querySelector('#app') doesn't work because we are using JSX
    document.querySelector('#app') as HTMLElement
);