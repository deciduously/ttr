import { observer } from "mobx-preact";
import { Component, h } from "preact";
import PlayerModel from "../../store/PlayerModel";
import "./Player.css";

export interface IPlayerProps {
    player: PlayerModel;
}

@observer
export default class Player extends Component<IPlayerProps> {
    public render(props: IPlayerProps) {
        return (
            <div class="Player">
                <div class="player-header">Player</div>
                <div class="player-container">{"Name: " + props.player.name}</div>
                <div class="player-container">{"Chutzpah: " + props.player.getChutzpah}</div>
                <button onClick={(_) => props.player.incrementChutzpah()}>Increment Chutzpah</button>
            </div>
        );
    }
}
