import { observer } from "mobx-react";
import * as React from "react";
import PlayerModel from "../../store/PlayerModel";
import "./Player.css";

export interface IPlayerProps {
    player: PlayerModel;
}

@observer
export default class Player extends React.Component<IPlayerProps> {
    public render() {
        return (
            <div className="Player">
                <div className="player-header">Player</div>
                <div className="player-container">{"Name: " + this.props.player.name}</div>
                <div className="player-container">{"Chutzpah: " + this.props.player.getChutzpah}</div>
            </div>
        );
    }
}
