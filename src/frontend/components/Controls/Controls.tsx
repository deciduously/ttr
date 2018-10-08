import { observer } from "mobx-preact";
import { Component, h } from "preact";
import GameModel from "../../store/GameModel";
import "./Controls.css";

export interface IControlsProps {
    game: GameModel;
}

@observer
export default class Controls extends Component<IControlsProps> {
    public render(props: IControlsProps) {
        return (
            <div class="controls">
                <span class="elapsedTime">{"Elapsed time: " + props.game.currentTime}</span>
                {props.game.visibleButtons.map((b) =>
                    <button key={b.text} onClick={(_) => props.game.applyAction(b.actions[0])}>{b.text}</button>,
                )}
            </div>
        );
    }
}
