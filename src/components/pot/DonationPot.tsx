import { createEffect, createSignal, For } from "solid-js";
import styles from "./DonationPot.module.scss";
import { Label } from "../common/Label";

interface DonationPotProps {
    amount: number;
    title?: string;
    formatter?: (amount: number) => string;
}

export function formatEUR(amount: number) {
    return amount.toFixed(2).replace(".", ",") + "\u00a0€";
}

export function DonationPot(props: DonationPotProps) {
    const amount = () => props.amount;
    const title = () => props.title || "Cagnotte globale";
    const formatter = () => props.formatter || formatEUR;
    const amountFormatted = () => formatter()(amount());
    return (
        <div class={styles.widget}>
            <Label title={title()} animated={true} additionalClasses={[styles.label]}></Label>
            <div class={styles.content}>
                <div class={styles.amount}>
                    <For each={[...amountFormatted()]}>
                        {(char, i) => <p class={styles.digit}>{char}</p>}
                    </For>
                </div>
            </div>
        </div>
    );
}