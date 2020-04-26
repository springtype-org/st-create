import { st } from "springtype/core";
import { component } from "springtype/web/component";
import { ILifecycle } from "springtype/web/component/interface";
import tpl from "./templatename.tpl";
import "./templatename.scss";
 
export interface ITemplateName {

}

@component({
    tpl
})
export class TemplateName extends st.component<ITemplateName> implements ILifecycle {
}