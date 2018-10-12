import { observer } from "mobx-react";
import * as React from "react";
import TimeModel from "../../store/models/TimeModel";

export interface ITimeProps {
  time: TimeModel;
  toggleClick: () => void;
}

const Time = observer((props: ITimeProps) => (
  <div className="time">
    <div>{"Elapsed time " + props.time.display}</div>
    <button onClick={props.toggleClick}>{props.time.isRunning ? "Pause" : "Start"}</button>
  </div>
));

export default Time;
