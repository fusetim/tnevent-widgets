import { children, createSignal, onMount } from "solid-js";
import styles from "../styles/screenview.module.scss";

import { DonationPot } from "../components/pot/DonationPot";
import { Tchat } from "../components/tchat/Tchat";
import { EXAMPLE_SPONSORS, SponsorDisplay } from "~/components/sponsor/Sponsor";

interface DragMoveAndSnapProps {
    children: any;
    initialPosition?: { x: number, y: number };
    snap?: { x: number, y: number };
}

function DragMoveAndSnap(props : DragMoveAndSnapProps) {
    // Snap is not implemented yet, for future use
    const safeChildren = children(() => props.children);
    const initialPosition = props.initialPosition || { x: 0, y: 0 };

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
        divEl.style.left = initialPosition.x+"px";
        divEl.style.top = initialPosition.y+"px";
    });

    return (
        <div
            ref={divEl}
            onMouseDown={handleMouseDown}
            class={styles.dragContainer}
        >
            {safeChildren()}
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
                <DragMoveAndSnap initialPosition={{ x: 0, y: 200 }}>
                    <DonationPot amount={amount() / 4} title="Cagnotte Équipe" />
                </DragMoveAndSnap>
                <DragMoveAndSnap initialPosition={{ x: 0, y: 400 }}>
                    <Tchat></Tchat>
                </DragMoveAndSnap>
                <DragMoveAndSnap initialPosition={{ x: 400, y: 0 }}>
                    <SponsorDisplay sponsors={EXAMPLE_SPONSORS}></SponsorDisplay>
                </DragMoveAndSnap>
            </div>
        </main>
    );
}