import * as React from "react";
import { AppStore } from "../../store/AppStore";

export interface INewGameProps {
    store: AppStore;
}

interface INewGameState {
    newPlayerName: string;
}

export default class NewGame extends React.Component<INewGameProps, INewGameState> {
    constructor(props: INewGameProps) {
        super(props);

        this.state = { newPlayerName: "Super Cool Space Name" };
    }

    public render() {
        return (
            <div>
                <input
                    type="text"
                    id="newPlayerName"
                    value={this.state.newPlayerName}
                    onInput={this.setPlayerName}>
                </input>
                <button onClick={(_) => this.props.store.newGame(this.state.newPlayerName)}>
                    {"New Game for player " + this.state.newPlayerName}
                </button>
            </div >
        );
    }

    private setPlayerName = (e) => this.setState({ newPlayerName: e.target.value });
}
