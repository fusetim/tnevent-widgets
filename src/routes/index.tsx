import { A } from "@solidjs/router";

export default function Index() {
    return (
        <div>
            <A href="/screenview">Go to Screenview</A>
            <br />
            <A href="/dashboard">Go to Dashboard</A>
        </div>
    );
}