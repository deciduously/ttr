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
}

export default class Map extends React.Component<IMapProps> {
    public render() {
        return (
            <div className="Map">
                <p>{"Standing on tile: " + this.props.currentTile}</p>
            </div>
        );
    }
}
