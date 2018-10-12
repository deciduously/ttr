import { action, computed, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { AppStore } from "../../store";

export interface INewGameProps {
  store: AppStore;
}

@observer
export default class NewGame extends React.Component<INewGameProps> {
  @computed private get getPlayerName(): string {
    return this.newPlayerName;
  }
  @observable private newPlayerName: string = "";
  constructor(props: INewGameProps) {
    super(props);
    this.setPlayerName("Super Cool Space Name");
  }

  public render() {
    return (
      <div>
        <input
          type="text"
          id="newPlayerName"
          value={this.getPlayerName}
          onChange={(e) => this.handleChange(e)}>
        </input>
        <button onClick={(_) => this.props.store.newGame(this.getPlayerName)}>
          {"New Game for player " + this.getPlayerName}
        </button>
      </div >
    );
  }
  @action private setPlayerName = (s: string) => this.newPlayerName = s;

  @action private handleChange(e) {
    this.setPlayerName(e.target.value);
  }
}
