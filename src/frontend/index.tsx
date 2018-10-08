import * as React from 'react';
import * as ReactDOM from "react-dom";
import App from "./components/App/App";
import { AppStore } from "./store/AppStore";

const store = new AppStore();

ReactDOM.render(
    <App store={store} />,
    // <HTMLElement>document.querySelector('#app') doesn't work because we are using JSX
    document.querySelector("#app") as HTMLElement,
);
