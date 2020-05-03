import { component } from "springtype/web/component";
import { tsx } from "springtype/web/vdom";
import { st } from "springtype/core";

@component
export class FragmentDemo extends st.component {
    render() {
        return <fragment>
            {/* Some random values */}
            <p>A {Math.random()}</p>
            <p>B {Math.random()}</p>
        </fragment>
    }
}