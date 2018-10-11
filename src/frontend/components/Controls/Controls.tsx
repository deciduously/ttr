import { observer } from "mobx-react";
import * as React from "react";
import { ButtonsModel } from "../../store/models/ButtonModel";
import "./Controls.css";

export interface IControlsProps {
    buttons: ButtonsModel;
    buttonClicked: (number) => void;
}

const Controls = observer((props: IControlsProps) => {
    return (
        <div className="control-panel">
            <div className="controls">
                <h4>Available Actions</h4>
                {props.buttons.availableButtons.map((b) => {
                    let buttonClickedEvent = (_event) => props.buttonClicked(b.id);
                    return (
                        <button key={b.id} onClick={buttonClickedEvent}>{b.text}</button>
                    );
                })}
            </div>
            <div className="active-actions">
                <h4>Active Actions</h4>
                {props.buttons.activeButtons.map((b) => {
                    <div key={b.id}>{b.text}</div>
                })}
            </div>
        </div>
    );
});

export default Controls;