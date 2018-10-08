import { observer } from "mobx-preact";
import { h } from "preact";
import "./Messages.css";

export interface IMessagesProps {
    messages: string[];
}

const Messages = observer((props: IMessagesProps) => {
    return (
        <div class="messages">
            <ul>
                {props.messages.map((m) => <li key={m}>{m}</li>)}
            </ul>
        </div>
    );
});

export default Messages;
