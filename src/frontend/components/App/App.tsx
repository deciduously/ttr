import { Component, h } from 'preact';
import { observer } from 'mobx-preact';
import { AppStore, errorGame } from '../../store/AppStore';
import NewGame from '../NewGame/NewGame';
import GameWindow from '../GameWindow/GameWindow';

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
                {(props.store.game == null) ? <NewGame store={props.store} /> : <GameWindow game={props.store.game || errorGame} />}
            </div>)
    }
}