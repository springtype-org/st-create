import { st } from "springtype/core";
import { component } from "springtype/web/component";
import { ILifecycle } from "springtype/web/component/interface";
import { tsx } from "springtype/web/vdom";
import tss from "./templatename.tss";
import tpl from "./templatename.tpl";

@component({
    tpl,
    tss
})
export class TemplateName extends st.component implements ILifecycle {
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'TemplateName': Partial<TemplateName>;
        }
    }
}


