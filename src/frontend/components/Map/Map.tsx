import * as React from "react";
import TileModel from "../../store/TileModel";
import "./Map.css";

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
