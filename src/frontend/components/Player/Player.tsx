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
                <p>{"Name: " + props.player.name}</p>
                <p>{"Chutzpah: " + props.player.getChutzpah}</p>
                <button onClick={(_) => props.player.incrementChutzpah()}>Increment Chutzpah</button>
            </div>
        );
    }
}
