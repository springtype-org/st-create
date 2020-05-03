import { component } from "springtype/web/component";
import { st } from "springtype/core";
import { tsx } from "springtype/web/vdom";

@component
export class ComplexPanel extends st.component {

    static readonly HEADER = "header";    
    static readonly FOOTER = "footer";
    
    render() {
      return <div class="container">
          <div class="header">
              {this.renderSlot(ComplexPanel.HEADER, <p>Default header content</p>)}
          </div>
          {this.renderChildren(<p>Default content</p>)}
          <div class="footer">
              {this.renderSlot(ComplexPanel.FOOTER, <p>Default footer content</p>)}
          </div>
      </div>;
    }
}