import { Component, h } from 'preact';
import { observer } from 'mobx-preact';
import { PlayerModel } from '../../store/AppStore';

export interface PlayerProps {
    player: PlayerModel
}

@observer
export default class Player extends Component<PlayerProps> {
    render(props: PlayerProps) {
        return (
            <div>
                <p>{'Name: ' + props.player.name}</p>
                <p>{'Chutzpah: ' + props.player.getChutzpah}</p>
                <button onClick={_ => props.player.incrementChutzpah()}>Increment Chutzpah</button>
            </div>
        )
    }
}