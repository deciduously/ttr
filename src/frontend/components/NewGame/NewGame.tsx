import { Component, h } from "preact";
import { AppStore } from '../../store/AppStore';

export interface NewGameProps {
    store: AppStore;
}

interface NewGameState {
    newPlayerName: string
}

export default class NewGame extends Component<NewGameProps, NewGameState> {
    constructor(props: NewGameProps) {
        super(props);

        this.state = { newPlayerName: 'Super Cool Space Name' }
    }
    setPlayerName = e => this.setState({ newPlayerName: e.target.value });
    render(props: NewGameProps, state: NewGameState) {
        return (
            <div>
                <input
                    type="text"
                    id="newPlayerName"
                    value={state.newPlayerName}
                    onInput={this.setPlayerName}>
                </input>
                <button onClick={_ => props.store.newGame(state.newPlayerName)}>
                    {'New Game for player ' + state.newPlayerName}
                </button>
            </div >
        )
    }
}