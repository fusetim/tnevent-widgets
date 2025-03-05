import styles from "./Label.module.scss";

interface LabelProps {
    title: string;
    animated?: boolean;
    additionalClasses?: string[];
}

export function Label(props: LabelProps) {
    const animated = () => props.animated || false;
    const classList = () => {
        let classes = [styles.label];
        if (props.additionalClasses) {
            classes.push(...props.additionalClasses);
        }
        if (animated()) {
            classes.push(styles.animated);
        }
        return classes.join(" ");
    }

    return (
        <div class={classList()}>
            <h1 class={styles.title}>{props.title}</h1>
        </div>
    );
}