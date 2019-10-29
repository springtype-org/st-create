import { st } from "springtype/core";
import { component } from "springtype/web/component";
import { ILifecycle } from "springtype/web/component/interface";
import tpl from "./templatename-main.tpl";
import tss from "./templatename-main.tss";

@component({
    tpl,
    tss
})
export class TemplateNameMain extends st.component implements ILifecycle {
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'TemplateNameMain': Partial<TemplateNameMain>;
        }
    }
}

