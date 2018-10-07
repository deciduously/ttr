import { Component, h } from 'preact';
import { observer } from 'mobx-preact';
import { AppStore } from '../store/AppStore';
import NewGame from './NewGame';

export interface AppProps {
  store: AppStore;
}

@observer
export default class App extends Component<AppProps> {
  render(props: AppProps) {
    return (
      <div>
        <h1>Take the ROCK</h1>
        <h2>The BEGINNING</h2>
        {(props.store.isActive) ? <NewGame store={props.store} /> :
          <div><p>{'Name: ' + props.store.getName}</p>
            <p>{'Chutzpah: ' + props.store.getChutzpah}</p>
            <p>{'Standing on tile: ' + props.store.getCurrentTile}</p></div>}
      </div>)
  }
}