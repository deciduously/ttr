import { Component, h } from 'preact'
import { observer } from 'mobx-preact'
import { Game } from '../../store/AppStore'
import Map from '../Map/Map'
import Messages from '../Messages/Messages'
import Player from '../Player/Player'
import './GameWindow.css'

export interface GameWindowProps {
    game: Game
}

@observer
export default class GameWindow extends Component<GameWindowProps> {
    render(props: GameWindowProps) {
        return (
            <div class="gameWindow">
                <div class="container">
                    <Player player={props.game.player} />
                    <Map tiles={props.game.world} currentTile={props.game.player.currentTile} />
                </div>
                <div class="container">
                    <Messages messages={props.game.lastFifteenMessages} />
                </div>
            </div>
        )
    }
}