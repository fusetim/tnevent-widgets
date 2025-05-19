interface VideoConfig {
    source_width: number;
    source_height: number;
}

const defaultVideoConfig: VideoConfig = {
    source_width: 1280,
    source_height: 720,
};

interface AudioConfig {
    enable: boolean;
}

const defaultAudioConfig: AudioConfig = {
    enable: true,
};

interface WidgetConfig {
    scaling_factor: number;
    animations: boolean;
    debug: boolean;
    simulation: boolean;
    event_socket_url: string;
}

const defaultWidgetConfig: WidgetConfig = {
    scaling_factor: 100,
    animations: true,
    debug: false,
    simulation: false,
    event_socket_url: "wss://tnevent.telecomnancy.net/widgets/events",
};

export type { VideoConfig, AudioConfig, WidgetConfig };
export { defaultVideoConfig, defaultAudioConfig, defaultWidgetConfig };