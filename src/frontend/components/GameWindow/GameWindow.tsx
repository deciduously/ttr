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
const GameWindow = observer((props: IGameWindowProps) => {
    return (
        <div className="gameWindow">
            <div className="container">
                <span className="elapsedTime">{"Elapsed time: " + props.game.currentTime}</span>
                <div className="stats-container">
                    <Player player={props.game.player} />
                    <Resources resources={props.game.resources} />
                    <Controls buttons={props.game.buttons} buttonClicked={(bId) => props.game.applyButton(bId)} />
                </div>
                <Map tiles={props.game.world} currentTile={props.game.player.currentTile} />
                <Messages messages={props.game.lastFifteenMessages} />
            </div>
        </div>
    );
});

export default GameWindow;
