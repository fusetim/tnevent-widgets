import { For } from "solid-js";
import { Label } from "../common/Label";
import styles from "./Tchat.module.scss";

export interface Message {
    author: string;
    text: string;
}

export interface TchatProps {

}

export function Tchat(props: TchatProps) {
    const messages = () => [
        /* For testing, 3/4 text examples */
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
            text: "All donation are given to a charity association! 🎉"
        },
        {
            author: "fs0ciety",
            text: "Donate here: https://tnevent.telecomnancy.eu"
        }
    ];


    return (
        <div class={styles.widget}>
            <Label title="Tchat" additionalClasses={[styles.label]}></Label>
            <div class={styles.content}>
                <For each={messages()}>
                    {(message: Message) =>
                        <div class={styles.message}>
                            <div class={styles.author}>
                                <p class={styles.authorName}>{message.author}</p>
                            </div>
                            <div class={styles.text}>
                                <p class={styles.messageText}>{message.text}</p>
                            </div>
                        </div>
                    }
                </For>
            </div>
        </div>
    );
}