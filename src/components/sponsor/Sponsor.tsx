import { createEffect, createSignal, onMount } from "solid-js";
import { ImageSrcset } from "~/lib/utils/ImageSrcset";
import styles from "./Sponsor.module.scss";
import { Dynamic } from "solid-js/web";

export interface Sponsor {
    name: string;
    logo: ImageSrcset;
}

export interface SponsorDisplayProps {
    sponsors: Sponsor[];
    timeOnScreen?: number;
}

interface SponsorProps {
    sponsor: Sponsor;
}

function Sponsor(props: SponsorProps) {
    return (
        <div class={styles.sponsor}>
            <img
                class={styles.sponsorLogo}
                src={props.sponsor.logo.getMainSrc().src}
                alt={"Sponsor " + props.sponsor.name}
                srcset={props.sponsor.logo.getSrcset().map(src => src.src + " " + src.mimeType).join(", ")} />
        </div>
    )
}

export function SponsorDisplay(props: SponsorDisplayProps) {
    const [currentSponsorIndex, setCurrentSponsorIndex] = createSignal(0);
    const currentSponsor = () => props.sponsors[currentSponsorIndex()];
    const timeOnScreen = props.timeOnScreen || 5;

    onMount(() => {
        const interval = setInterval(() => {
            setCurrentSponsorIndex((currentSponsorIndex() + 1) % props.sponsors.length);
        }, timeOnScreen * 1000);
        return () => clearInterval(interval);
    });

    return (
        <div class={styles.widget}>
            <h2 class={styles.title}>MERCI À NOS PARTENAIRES</h2>
            <Dynamic component={Sponsor} sponsor={currentSponsor()}></Dynamic>
        </div>
    );
}

export const EXAMPLE_SPONSORS: Sponsor[] = [
    {
        name: "Anim'Est",
        logo: new ImageSrcset("/assets/sponsors/animest.ext", ["png"])
    },
    {
        name: "GearX",
        logo: new ImageSrcset("/assets/sponsors/gearX.ext", ["jpg"])
    },
    {
        name: "Google",
        logo: new ImageSrcset("/assets/sponsors/google.ext", ["jpg"])
    },
    {
        name: "KubeX",
        logo: new ImageSrcset("/assets/sponsors/kubeX.ext", ["jpg"])
    },
];