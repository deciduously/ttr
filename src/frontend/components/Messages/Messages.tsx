import { h } from 'preact'
import { observer } from 'mobx-preact'

export interface MessagesProps {
    messages: string[];
}

const Messages = observer((props: MessagesProps) => {
    return (
        <div>
            <ul>
                {props.messages.map(m => <li key={m}>{m}</li>)}
            </ul>
        </div>
    )
})

export default Messages;