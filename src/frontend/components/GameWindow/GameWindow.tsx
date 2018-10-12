import { observer } from "mobx-react";
import * as React from "react";
import GameModel from "../../store/models/GameModel";
import Controls from "../Controls/Controls";
import Map from "../Map/Map";
import Messages from "../Messages/Messages";
import Player from "../Player/Player";
import Resources from "../Resources/Resources";
import Time from "../Time/Time";
import "./GameWindow.css";

export interface IGameWindowProps {
  game: GameModel;
}
const GameWindow = observer((props: IGameWindowProps) => {
  return (
    <div className="gameWindow">
      <div className="header">

      </div>
      <div className="container">
        <Time time={props.game.gameTime} toggleClick={() => props.game.toggleRunning()} />
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
