import { observer } from "mobx-preact";
import { h } from "preact";
import "./Messages.css";

export interface IMessagesProps {
    messages: string[];
}

const Messages = observer((props: IMessagesProps) => {
    return (
        <div class="messages">
            <div class="messages-header">Messages</div>
            <ul class="messages-container">
                {props.messages.map((m) => <li key={m} class="message">{m}</li>)}
            </ul>
        </div>
    );
});

export default Messages;
