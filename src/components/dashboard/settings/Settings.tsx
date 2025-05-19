import "./Settings.css";
import VideoSettings from "./VideoSettings";
import AudioSettings from "./AudioSettings";
import WidgetSettings from "./WidgetSettings";

function Settings() {
    return (
        <>
            <h2>Settings</h2>
            <VideoSettings id="settings-video"></VideoSettings>
            <AudioSettings  id="settings-audio"></AudioSettings>
            <WidgetSettings  id="settings-widgets"></WidgetSettings>
        </>
    )
}

export default Settings;