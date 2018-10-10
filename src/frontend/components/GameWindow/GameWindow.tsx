import { observer } from "mobx-react";
import * as React from "react";
import GameModel from "../../store/models/GameModel";
import Controls from "../Controls/Controls";
import Map from "../Map/Map";
import Messages from "../Messages/Messages";
import Player from "../Player/Player";
import Resources from "../Resources/Resources";
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
                    <span className="elapsedTime">{"Elapsed time: " + this.props.game.currentTime}</span>
                    <Player player={this.props.game.player} />
                    <Resources resources={this.props.game.resources} />
                    <Controls buttons={this.props.game.buttons} buttonClicked={(bId) => this.props.game.applyButton(bId)} />
                    <Map tiles={this.props.game.world} currentTile={this.props.game.player.currentTile} />
                </div>
                <div className="container">
                    <Messages messages={this.props.game.lastFifteenMessages} />
                </div>
            </div>
        );
    }
}
