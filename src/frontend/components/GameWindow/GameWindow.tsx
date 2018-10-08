import { Component, h } from 'preact'
import { observer } from 'mobx-preact'
import { Game } from '../../store/AppStore'
import Map from '../Map/Map'
import Messages from '../Messages/Messages'
import Player from '../Player/Player'

export interface GameWindowProps {
    game: Game
}

@observer
export default class GameWindow extends Component<GameWindowProps> {
    render(props: GameWindowProps) {
        return (
            <div>
                <Player player={props.game.player} />
                <Map tiles={props.game.world} currentTile={props.game.player.currentTile} />
                <Messages messages={props.game.lastFifteenMessages} />
            </div>
        )
    }
}