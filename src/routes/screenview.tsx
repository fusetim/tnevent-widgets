import { children, createSignal, onMount } from "solid-js";
import styles from "../styles/screenview.module.scss";

import { DonationPot } from "../components/pot/DonationPot";

function DragMoveAndSnap(props) {
    // Snap is not implemented yet, for future use
    const safeChildren = children(() => props.children);

    let divEl!: HTMLDivElement;

    // Dragging logic 
    let [isDragging, setIsDragging] = createSignal(false);

    function handleMouseDown(event: MouseEvent) {
        setIsDragging(true);
        const compStyle = window.getComputedStyle(divEl);
        const offsetX = event.clientX - Number(compStyle.getPropertyValue("left").replace("px", ""));
        const offsetY = event.clientY - Number(compStyle.getPropertyValue("top").replace("px", ""));

        const handleMouseUp = () => {
            setIsDragging(false);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mousemove", handleMouseMove);
        };

        const handleMouseMove = (event: MouseEvent) => {
            if (isDragging()) {
                divEl.style.left = `${event.clientX - offsetX}px`;
                divEl.style.top = `${event.clientY - offsetY}px`;
            }
        }

        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mousemove", handleMouseMove);
    }

    onMount(() => {
        divEl.style.left = "0px";
        divEl.style.top = "0px";
    });

    return (
        <div
            ref={divEl}
            onMouseDown={handleMouseDown}
            class={styles.dragContainer}
        >
            {safeChildren}
        </div>
    )
}

export default function Screenview() {
    /* Increment the timer by a random number between 200 and 1 each 10s */
    let [amount, setAmount] = createSignal(9876.54);

    onMount(() => {
        setInterval(() => {
            setAmount(amount() + Math.random() * 200 + 1);
        }, 3000);
    })

    return (
        <main class={styles.main}>
            <div class={styles.container}>
                <DragMoveAndSnap>
                    <DonationPot amount={amount()} />
                </DragMoveAndSnap>
                <DragMoveAndSnap>
                    <DonationPot amount={amount() / 4} title="Cagnotte Équipe" />
                </DragMoveAndSnap>
            </div>
        </main>
    );
}