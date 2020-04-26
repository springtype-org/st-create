import { st } from "springtype/core";
import { component } from "springtype/web/component/decorator/component";
import { ILifecycle } from "springtype/web/component/interface";
import { FirstScene } from "../first-scene/first-scene";
import "./templatename-main.scss";
import { tsx } from "springtype/web/vdom";

@component
export class TemplateNameMain extends st.component implements ILifecycle {

    render() {
        return <FirstScene />
    }
}