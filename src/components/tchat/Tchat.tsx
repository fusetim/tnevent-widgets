import { createEffect, createSignal, For, JSX, onMount } from "solid-js";
import { Label } from "../common/Label";
import styles from "./Tchat.module.scss";

export interface Message {
    author: string;
    text: string;
}

export interface TchatProps {

}

function message(message: Message, index: () => number): JSX.Element {
    return (
        <div class={styles.message} classList={{ [styles.seen]: index() >= 4}}>
            <div class={styles.author}>
                <p class={styles.authorName}>{message.author}</p>
            </div>
            <div class={styles.text}>
                <p class={styles.messageText}>{message.text}</p>
            </div>
        </div>
    )
}

const msg_examples = [
    {
        author: "vedal987",
        text: "Hey everyone, I'm new here !"
    },
    {
        author: "sparklingUnicorn",
        text: "Welcome vedal987 !"
    },
    {
        author: "gemHidden",
        text: "All donation are given to a charity association! 🎉 Feel free to donate any amount, even 1€ is important!"
    },
    {
        author: "fs0ciety",
        text: "Donate here: https://tnevent.telecomnancy.eu"
    },
    {
        author: "fusetim",
        text: "I'm looking for a team, anyone interested?"
    }
];

interface MessageBuffer {
    messages: Message[];
    first: number;
}

export function Tchat(props: TchatProps) {    
    const maxMessages = 4;
    const [messageBuffer, setMessageBuffer] = createSignal<MessageBuffer>({ messages: msg_examples.slice(1, 5), first: 0 });
    const messages = () => messageBuffer().messages.toReversed();
    const messageFirst = () => messageBuffer().first;

    const [tmpIndex, setTmpindex] = createSignal(0);

    onMount(() => {
        // Periodically remove the messages seen.
        const interval = setInterval(() => {
            if (messageBuffer().first != 0) {
                setMessageBuffer({ messages: messageBuffer().messages.slice(messageBuffer().first), first: 0 });
            }
        }, 3000);

        // Add a message every 5 seconds.
        const interval2 = setInterval(() => {
            let newQueue = [...messageBuffer().messages, msg_examples[tmpIndex() % msg_examples.length]];
            setTmpindex(tmpIndex() + 1);
            if (messageBuffer().messages.length >= maxMessages) {
                setMessageBuffer({ messages: newQueue, first: messageBuffer().first + 1});
            } else {
                setMessageBuffer({ messages: newQueue, first: 0 });
            }
        }, 5000);
    });

    return (
        <div class={styles.widget}>
            <Label title="Tchat" additionalClasses={[styles.label]}></Label>
            <div class={styles.content}>
                <For each={messages()}>
                    {(msg, index) => message(msg, index)}
                </For>
            </div>
        </div>
    );
}