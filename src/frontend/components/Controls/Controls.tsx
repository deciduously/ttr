import { observable } from "mobx-preact";
import { Component, h } from "preact";
import ButtonModel from "../../store/ButtonModel";
import "./Controls.css";

export interface IControlsProps {
    buttons: ButtonModel[];
}

@observable
export default class Controls extends Component<IControlsProps> {
    public render(props: IControlsProps) {
        return (
            <div class="controls">
                {props.buttons.map((b) => <button key={b.text}>{b.text}</button>)}
            </div>
        );
    }
}
