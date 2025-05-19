import { getWidgetSettings, setWidgetSettings } from "../stores/SettingsStore";

interface WidgetSettingsProps {
    id?: string;
}

const setScalingFactor = (e: Event) => {
    const widgetSettings = getWidgetSettings();
    const target = e.target as HTMLInputElement;
    const newScalingFactor = parseInt(target.value);
    if (!isNaN(newScalingFactor) && newScalingFactor >= 10 && newScalingFactor <= 1000) {
        // Update the scaling factor in the widget settings
        setWidgetSettings({ ...widgetSettings, scaling_factor: newScalingFactor });
    }
};

const setAnimations = (e: Event) => {
    const widgetSettings = getWidgetSettings();
    const target = e.target as HTMLInputElement;
    const newAnimations = target.checked;
    // Update the animations setting in the widget settings
    setWidgetSettings({ ...widgetSettings, animations: newAnimations });
};

const setDebug = (e: Event) => {
    const widgetSettings = getWidgetSettings();
    const target = e.target as HTMLInputElement;
    const newDebug = target.checked;
    // Update the debug setting in the widget settings
    setWidgetSettings({ ...widgetSettings, debug: newDebug });
};

const setSimulation = (e: Event) => {
    const widgetSettings = getWidgetSettings();
    const target = e.target as HTMLInputElement;
    const newSimulation = target.checked;
    // Update the simulation setting in the widget settings
    setWidgetSettings({ ...widgetSettings, simulation: newSimulation });
};

const setEventSocket = (e: Event) => {
    const widgetSettings = getWidgetSettings();
    const target = e.target as HTMLInputElement;
    const newEventSocket = target.value;
    // Check if the new URL is valid and is a WebSocket URL
    const isValidWebSocketUrl = (url: string) => {
        try {
            const parsedUrl = new URL(url);
            return parsedUrl.protocol === "ws:" || parsedUrl.protocol === "wss:";
        } catch (e) {
            return false;
        }
    };
    if (isValidWebSocketUrl(newEventSocket)) {
        // Update the event socket URL in the widget settings
        setWidgetSettings({ ...widgetSettings, event_socket_url: newEventSocket });
    }
};

function WidgetSettings(props: WidgetSettingsProps) {
    const widgetSettings = getWidgetSettings();
    const scalingFactor = () => widgetSettings.scaling_factor;
    const animations = () => widgetSettings.animations;
    const debug = () => widgetSettings.debug;
    const simulation = () => widgetSettings.simulation;
    const eventSocket = () => widgetSettings.event_socket_url;

    return (
        <div class="settings-group" id={props.id}>
            <h3 class="settings-title">Widgets</h3>
            <table>
                <tbody>
                    <tr class="settings-row">
                        <td class="settings-label">Scaling factor (10-1000%)</td>
                        <td class="settings-value">
                            <div style="display: flex; gap: 0.25rem; align-items: stretch; flex-wrap: wrap; flex-direction: row;">
                                <input type="number" id="widgets-scaling-factor" value={scalingFactor()} min="10" max="1000" step="5" style="flex:1;" on:change={setScalingFactor} />
                                <p>%</p>
                            </div>
                        </td>
                    </tr>
                    <tr class="settings-row">
                        <td class="settings-label">Enable Animations</td>
                        <td class="settings-value">
                            <input type="checkbox" id="widgets-animations-enable" checked={animations()} on:change={setAnimations} />
                        </td>
                    </tr>
                    <tr class="settings-row">
                        <td class="settings-label">Enable Debug Mode</td>
                        <td class="settings-value">
                            <input type="checkbox" id="widgets-debug-enable" checked={debug()} on:change={setDebug} />
                        </td>
                    </tr>
                    <tr class="settings-row">
                        <td class="settings-label">Simulate Events</td>
                        <td class="settings-value">
                            <input type="checkbox" id="widgets-simulation-enable" checked={simulation()} on:change={setSimulation}/>
                        </td>
                    </tr>
                    <tr class="settings-row">
                        <td class="settings-label">Event Socket</td>
                        <td class="settings-value">
                            <input type="url" id="widgets-event-socket" placeholder="wss://tnevent.telecomnancy.net/widgets/events" value={eventSocket()} on:change={setEventSocket} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default WidgetSettings;
export type { WidgetSettingsProps };