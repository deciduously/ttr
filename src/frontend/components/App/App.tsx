import { observer } from "mobx-preact";
import { Component, h } from "preact";
import { AppStore, errorGame } from "../../store/AppStore";
import GameWindow from "../GameWindow/GameWindow";
import NewGame from "../NewGame/NewGame";

export interface IAppProps {
    store: AppStore;
}

@observer
export default class App extends Component<IAppProps> {
    public render(props: IAppProps) {
        return (
            <div>
                <h1>Take the ROCK</h1>
                <h2>The BEGINNING</h2>
                {(props.store.game == null)
                    ? <NewGame store={props.store} />
                    : <GameWindow game={props.store.game || errorGame} />}
            </div>
        );
    }
}
