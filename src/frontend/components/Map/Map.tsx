import { Component, h } from 'preact'
import { TileModel } from '../../store/AppStore'

export interface MapProps {
    tiles: TileModel[];
    currentTile: number;
}

export default class Map extends Component<MapProps> {
    render(props: MapProps) {
        return (
            <div>
                <p>{'Standing on tile: ' + props.currentTile}</p>
            </div>
        )
    }
}