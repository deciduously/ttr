import { observer } from "mobx-react";
import * as React from "react";
import "./Messages.css";

export interface IMessagesProps {
    messages: string[];
}

const Messages = observer((props: IMessagesProps) => {
    return (
        <div className="messages">
            <div className="messages-header">Messages</div>
            <ul className="messages-container">
                {props.messages.map((m) => <li key={m} className="message">{m}</li>)}
            </ul>
        </div>
    );
});

export default Messages;
