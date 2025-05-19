import { DragAndDrop } from "../../common/DragAndDrop";
import { DonationPot } from "../../pot/DonationPot";
import { Tchat } from "../../tchat/Tchat";
import { getSharedSettings } from "../stores/SettingsStore";

import "./Editor.css";

function Editor() {
    const sharedSettings = getSharedSettings;
    const video_width = () => sharedSettings.video.source_width;
    const video_height = () => sharedSettings.video.source_height;
    const widget_scaling_factor = () => sharedSettings.widgets.scaling_factor;
    const aspect_ratio = () => `${video_width()} / ${video_height()}`;

    let el!: HTMLDivElement;

    // Based on the actual rendered size of the editor
    // Calculate the scale
    const scale = () => {
        if (el) {
            const rect = el.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const scaleX = width / video_width();
            const scaleY = height / video_height();

            if (Math.abs(scaleX - scaleY) < 0.01) {
                console.warn("editor - scale is not uniform, scaleX: ", scaleX, " scaleY: ", scaleY);
            }
            return Math.min(scaleX, scaleY) * widget_scaling_factor() / 100;
        }
        return 1 * widget_scaling_factor() / 100;
    }

    return (
        <div id="editor-container" style={{"aspect-ratio": aspect_ratio(), "font-size": `${scale()}rem`}} ref={el}>
            <DragAndDrop initialPosition={{ x: 48, y: 0 }} snapGrid={{ x: 48, y: 48 }}>
                <DonationPot amount={1000}></DonationPot>
            </DragAndDrop>
            <DragAndDrop initialPosition={{ x: 48, y: 96 }} snapGrid={{ x: 48, y: 48 }}>
                <DonationPot amount={1000}></DonationPot>
            </DragAndDrop>
            <DragAndDrop initialPosition={{ x: 48, y: 240 }}>
                <Tchat ></Tchat>
            </DragAndDrop>
        </div>
    )
}

export default Editor;