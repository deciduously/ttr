import { Component, h } from "preact";
import { AppStore } from "../../store/AppStore";

export interface INewGameProps {
    store: AppStore;
}

interface INewGameState {
    newPlayerName: string;
}

export default class NewGame extends Component<INewGameProps, INewGameState> {
    constructor(props: INewGameProps) {
        super(props);

        this.state = { newPlayerName: "Super Cool Space Name" };
    }

    public render(props: INewGameProps, state: INewGameState) {
        return (
            <div>
                <input
                    type="text"
                    id="newPlayerName"
                    value={state.newPlayerName}
                    onInput={this.setPlayerName}>
                </input>
                <button onClick={(_) => props.store.newGame(state.newPlayerName)}>
                    {"New Game for player " + state.newPlayerName}
                </button>
            </div >
        );
    }

    private setPlayerName = (e) => this.setState({ newPlayerName: e.target.value });
}
