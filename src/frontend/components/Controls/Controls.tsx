import { observer } from "mobx-react";
import * as React from "react";
import ButtonsModel from "../../store/models/ButtonsModel";
import "./Controls.css";

export interface IControlsProps {
  buttons: ButtonsModel;
  buttonClicked: (n) => void;
}

const Controls = observer((props: IControlsProps) => {
  return (
    <div className="control-panel">
      <div className="controls">
        {props.buttons.availableButtons.map((b) => {
          const buttonClickedEvent = (_) => props.buttonClicked(b.id);
          return (
            <button key={b.id} onClick={buttonClickedEvent}>{b.text + " - " + b.timeCost / 1000 + " seconds"}</button>
          );
        })}
      </div>
      {props.buttons.activeButtons.map((b) => (
        <div key={b.id}>{b.text}<br />{"Time left: " + Math.ceil(b.timeCost / 1000) + " seconds"}</div>
      ))}
    </div>
  );
});

export default Controls;
