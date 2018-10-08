import { observer } from "mobx-react";
import * as React from "react";
import GameModel from "../../store/GameModel";
import "./Controls.css";

export interface IControlsProps {
    game: GameModel;
}

@observer
export default class Controls extends React.Component<IControlsProps> {
    public render() {
        return (
            <div className="controls">
                <span className="elapsedTime">{"Elapsed time: " + this.props.game.currentTime}</span>
                {this.props.game.visibleButtons.map((b) =>
                    <button key={b.text} onClick={(_) => this.props.game.applyAction(b.actions[0])}>{b.text}</button>,
                )}
            </div>
        );
    }
}
