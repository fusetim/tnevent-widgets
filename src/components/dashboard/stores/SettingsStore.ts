import { defaultAudioConfig, defaultVideoConfig, defaultWidgetConfig, type AudioConfig, type VideoConfig, type WidgetConfig } from "../../../lib/dashboard/settings";
import { createStore } from "solid-js/store";

interface SettingsStore {
    video: VideoConfig;
    audio: AudioConfig;
    widgets: WidgetConfig;
}

const [getSharedSettings, setSharedSettings] = createStore<SettingsStore>({
    video: defaultVideoConfig,
    audio: defaultAudioConfig,
    widgets: defaultWidgetConfig,
});

const getVideoSettings = () => getSharedSettings.video;
const setVideoSettings = (video: VideoConfig) => setSharedSettings("video", video);
const getAudioSettings = () => getSharedSettings.audio;
const setAudioSettings = (audio: AudioConfig) => setSharedSettings("audio", audio);
const getWidgetSettings = () => getSharedSettings.widgets;
const setWidgetSettings = (widgets: WidgetConfig) => setSharedSettings("widgets", widgets);

export type { SettingsStore };
export { getSharedSettings, setSharedSettings, getVideoSettings, setVideoSettings, getAudioSettings, setAudioSettings, getWidgetSettings, setWidgetSettings };
