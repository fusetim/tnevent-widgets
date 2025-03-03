import { children, createSignal } from "solid-js";
import styles from "../styles/screenview.module.scss";

function DonationPot() {
    let [count, setCount] = createSignal(0);
    return (
        <div>
            <p>{count()}</p>
            <button onClick={() => setCount(count() + 1)}>Increment</button>
        </div>
    );
}

function DragMoveAndSnap(props) {
    // Snap is not implemented yet, for future use
    const safeChildren = children(() => props.children);

    let divEl!: HTMLDivElement;

    // Dragging logic 
    let [isDragging, setIsDragging] = createSignal(false);

    function handleMouseDown(event: MouseEvent) {
        setIsDragging(true);
        const offsetX = event.clientX - divEl.getBoundingClientRect().left;
        const offsetY = event.clientY - divEl.getBoundingClientRect().top;
        
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

    return (
        <div
            ref={divEl} 
            onMouseDown={handleMouseDown}
            style={{ position: "relative" }}>
            {safeChildren}
        </div>
    )
}

export default function Screenview() {
    return (
        <main class={styles.main}>
            <div class={styles.container}>
                <DragMoveAndSnap>
                    <DonationPot />
                </DragMoveAndSnap>
            </div>
        </main>
    );
}