import { getVideoSettings, setVideoSettings } from "../stores/SettingsStore";

interface VideoSettingsProps {
    id?: string;
}

const setWidth = (e: Event) => {
    const videoSettings = getVideoSettings();
    const target = e.target as HTMLInputElement;
    const newWidth = parseInt(target.value);
    if (!isNaN(newWidth)) {
        setVideoSettings({ ...videoSettings, source_width: newWidth });
    }
};
const setHeight = (e: Event) => {
    const videoSettings = getVideoSettings();
    const target = e.target as HTMLInputElement;
    const newHeight = parseInt(target.value);
    if (!isNaN(newHeight)) {
        setVideoSettings({ ...videoSettings, source_height: newHeight });
    }
};

function VideoSettings(props: VideoSettingsProps) {
    const videoSettings = getVideoSettings();
    const width = () => videoSettings.source_width;
    const height = () => videoSettings.source_height;

    return (
        <div class="settings-group" id={props.id}>
            <h3 class="settings-title">Video</h3>
            <table>
                <tbody>
                    <tr class="settings-row">
                        <td class="settings-label">Source Resolution</td>
                        <td class="settings-value">
                            <div style="display: flex; gap: 0.25rem; align-items: stretch; justify-content: center;">
                                <input type="number" id="video-width" value={width()} on:change={setWidth} />
                                <p>x</p>
                                <input type="number" id="video-height" value={height()} on:change={setHeight} />
                                <p>px</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default VideoSettings;
export type { VideoSettingsProps };