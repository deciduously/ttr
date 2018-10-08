import { Component, h } from "preact";
import TileModel from "../../store/TileModel";
import "./Map.css";

export interface IMapProps {
    tiles: TileModel[];
    currentTile: number;
}

export default class Map extends Component<IMapProps> {
    public render(props: IMapProps) {
        return (
            <div class="Map">
                <p>{"Standing on tile: " + props.currentTile}</p>
            </div>
        );
    }
}
