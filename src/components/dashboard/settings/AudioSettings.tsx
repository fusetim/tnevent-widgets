import { getAudioSettings, setAudioSettings } from "../stores/SettingsStore";

interface AudioSettingsProps {
    id?: string;
}

const setEnable = (e: Event) => {
    const audioSettings = getAudioSettings();
    const target = e.target as HTMLInputElement;
    const newEnable = target.checked;
    setAudioSettings({ ...audioSettings, enable: newEnable });
}

function AudioSettings(props: AudioSettingsProps) {
    const audioSettings = getAudioSettings();
    const enable = () => audioSettings.enable;

    return (
        <div class="settings-group" id={props.id}>
            <h3 class="settings-title">Audio</h3>
            <table>
                <tbody>
                    <tr class="settings-row">
                        <td class="settings-label">Enable</td>
                        <td class="settings-value">
                            <input type="checkbox" id="audio-enable" checked={enable()} on:change={setEnable} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default AudioSettings;
export type { AudioSettingsProps };