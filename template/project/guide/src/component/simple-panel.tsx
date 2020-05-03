import { component } from "springtype/web/component";
import { st } from "springtype/core";

@component
export default class SimplePanel extends st.component {

    render() {
      return this.renderChildren();
    }
}