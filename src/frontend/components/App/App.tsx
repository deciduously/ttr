import { observer } from "mobx-react";
import * as React from "react";
import { AppStore, errorGame } from "../../store";
import GameWindow from "../GameWindow/GameWindow";
import NewGame from "../NewGame/NewGame";

export interface IAppProps {
  store: AppStore;
}

@observer
export default class App extends React.Component<IAppProps> {
  public render() {
    return (
      <div>
        <h1>Take the ROCK</h1>
        <h2>The BEGINNING</h2>
        {(this.props.store.game == null)
          ? <NewGame store={this.props.store} />
          : <GameWindow game={this.props.store.game || errorGame} />}
      </div>
    );
  }
}
