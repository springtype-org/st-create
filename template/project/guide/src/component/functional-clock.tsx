import { tsx } from "springtype/web/vdom";
import { st } from "springtype/core";
import { component, Component } from "springtype/web/component";

const getTime = () => new Date().toString();

export const Clock = component((clock: Component & {
    timeDisplay: HTMLElement
}) => {

    // closure-local scope state
    let now: string = getTime();

    // mouse event handler
    const updateUnixTime = (evt: MouseEvent) => {

        // update closure-local state
        now = getTime();

        // update display value
        clock.renderPartial(now, clock.timeDisplay!);
    };

    // update every second
    setInterval(updateUnixTime, 1000);

    // initially render current state
    return () => (
        <fragment>
            <button onClick={updateUnixTime}>Update time</button>
            <p ref={{ timeDisplay: clock }}>{now}</p>
        </fragment>
    );
}, 'clock' /* DOM tag name to use*/);