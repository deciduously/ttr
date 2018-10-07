import { Component, h } from 'preact';
import { observer } from 'mobx-preact';
import { AppState } from '../store/AppState';

export interface AppProps {
  store: AppState
}

@observer
export default class App extends Component<AppProps> {
  render(props: AppProps) {
    return (
      <div>
        <h1>Take the ROCK</h1>
        <h2>The BEGINNING</h2>
        <p>{props.store.getName}</p>
        <button onClick={_ => props.store.newGame('defaultName')}>New Game</button>
      </div>);
  }
}