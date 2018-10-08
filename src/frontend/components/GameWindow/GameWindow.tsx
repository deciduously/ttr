import { observer } from "mobx-preact";
import { Component, h } from "preact";
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
export default class GameWindow extends Component<IGameWindowProps> {
    public render(props: IGameWindowProps) {
        return (
            <div class="gameWindow">
                <div class="container">
                    <Player player={props.game.player} />
                    <Controls buttons={props.game.visibleButtons} />
                    <Map tiles={props.game.world} currentTile={props.game.player.currentTile} />
                </div>
                <div class="container">
                    <Messages messages={props.game.lastFifteenMessages} />
                </div>
            </div>
        );
    }
}
