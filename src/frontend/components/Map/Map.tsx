import { observer } from "mobx-react";
import * as React from "react";
import TileModel from "../../store/models/TileModel";
import "./Map.css";

// The map always shows a 25/25 square and is infinitely scrollable
// The ones you havent uncovered are covered up
// The ones you are able to explore have a button on them to explore them
// The ones you have explored have their little cube of ascii art -decide how much to give yourself
// and then design some!
// render the squres first to see how much space you have

export interface IMapProps {
  tiles: TileModel[];
  currentTile: number;
  movementKeyPressed: (n) => void;
}

@observer
export default class Map extends React.Component<IMapProps> {
  public render() {
    return (
      <div className="Map" onKeyPress={this.handleKeyPress} tabIndex={0}>
        <p>{"Standing on tile: " + this.props.currentTile}</p>
      </div>
    );
  }
  private handleKeyPress = (e) => {
    switch (e.key) {
      case "w":
        this.props.movementKeyPressed("MOVE_UP");
        break;
      case "s":
        this.props.movementKeyPressed("MOVE_DOWN");
        break;
      case "a":
        this.props.movementKeyPressed("MOVE_LEFT");
        break;
      case "d":
        this.props.movementKeyPressed("MOVE_RIGHT");
        break;
      default:
        break;
    }
  }
}
