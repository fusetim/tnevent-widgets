import { children, createSignal, onMount } from "solid-js";
import styles from "./DragAndDrop.module.css";

export interface DragAndDropProps {
    children: any,
    initialPosition?: { x: number, y: number },
    snapGrid?: { x: number, y: number },
}

export function DragAndDrop(props: DragAndDropProps) {
    const { initialPosition, snapGrid } = props;
    const snapX = snapGrid?.x || 1;
    const snapY = snapGrid?.y || 1;
    const initialX = initialPosition?.x || 0;
    const initialY = initialPosition?.y || 0;
    const safeChildren = children(() => props.children);

    let divEl!: HTMLDivElement;

    const [dragStart, setDragStart] = createSignal({ x: 0, y: 0 });

    const updateDragPosition = (e : MouseEvent) => {
        const [startX, startY] = [dragStart().x, dragStart().y];
        const x = (e.clientX - startX);
        const y = (e.clientY - startY);

        // Snap to grid
        const snappedX = Math.round(x / snapX) * snapX;
        const snappedY = Math.round(y / snapY) * snapY;

        divEl.style.transform = `translate(${snappedX}px, ${snappedY}px)`;
    }

    onMount(() => {
        divEl.style.transform = `translate(${initialX}px, ${initialY}px)`;

        divEl.addEventListener("mousedown", (e) => {
            const compStyle = window.getComputedStyle(divEl);
            const transform = compStyle.transform;
            const matrix = new DOMMatrix(transform);
            const offsetX = matrix.m41;
            const offsetY = matrix.m42;
            setDragStart({ x: e.clientX - offsetX, y: e.clientY - offsetY });
            divEl.classList.add(styles.dragging);
        });

        divEl.addEventListener("mouseup", (e) => {
            if (!divEl.classList.contains(styles.dragging)) return;
            e.preventDefault();
            divEl.classList.remove(styles.dragging);
        }); 

        divEl.addEventListener("mousemove", (e) => {
            if (!divEl.classList.contains(styles.dragging)) return;
            e.preventDefault();
            updateDragPosition(e);
        });

    });

    return (
        <div class={styles.component} ref={divEl}>
            {safeChildren()}
        </div>
    );
}
