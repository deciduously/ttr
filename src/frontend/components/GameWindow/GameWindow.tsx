import { observer } from "mobx-react";
import * as React from "react";
import GameModel from "../../store/GameModel";
import Controls from "../Controls/Controls";
import Map from "../Map/Map";
import Messages from "../Messages/Messages";
import Player from "../Player/Player";
import "./GameWindow.css";

export interface IGameWindowProps {
    game: GameModel;
}

@observer
export default class GameWindow extends React.Component<IGameWindowProps> {
    public render() {
        return (
            <div className="gameWindow">
                <div className="container">
                    <Player player={this.props.game.player} />
                    <Controls game={this.props.game} />
                    <Map tiles={this.props.game.world} currentTile={this.props.game.player.currentTile} />
                </div>
                <div className="container">
                    <Messages messages={this.props.game.lastFifteenMessages} />
                </div>
            </div>
        );
    }
}
