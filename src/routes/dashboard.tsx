
export default function Dashboard() {
    return (
        <main>
            <div>
                <h1>Dashboard</h1>
                <p>Welcome to the dashboard!</p>
                <p>Here you can manage your application settings and view analytics.</p>
            </div>
            <form action="post">
                <h2>Settings</h2>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={2} class="settings-subtitle">Video</td>
                        </tr>
                        <tr>
                            <td>Width</td>
                            <td>
                                <input type="number" name="videoWidth" id="videoWidth" value={1920} />
                            </td>
                        </tr>
                        <tr>
                            <td>Height</td>
                            <td>
                                <input type="number" name="videoHeight" id="videoHeight" value={1080} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} class="settings-subtitle">Audio</td>
                        </tr>
                        <tr>
                            <td>Enable</td>
                            <td>
                                <input type="checkbox" name="audioEnable" id="audioEnable" />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} class="settings-subtitle">Widgets</td>
                        </tr>
                        <tr>
                            <td>Scaling factor (%)</td>
                            <td>
                                <input type="number" name="widgetScaling" id="widgetScaling" min={10} max={1000} value={100} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </main>
    )
}