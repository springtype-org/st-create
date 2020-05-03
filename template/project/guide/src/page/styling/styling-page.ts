import { st } from "springtype/core";
import { ref } from "springtype/core/ref";
import { component, attr } from "springtype/web/component";

// external TSX template import
import tpl from "./styling-page.tpl";

@component({
    // passes the template function reference to the component  
    tpl
})
export default class StylingPage extends st.component {

    // inline styles can be applied to a component's 
    // root element as well:
    style = {
        display: 'block',
        border: '1px dotted #333'
    }

    // as well as classes can be set
    // we're using a global CSS class here, 
    // imported in the template file
    // Please note: This just serves demo purposes.
    // Global CSS should always be imported in index.tsx!
    class = ['padded']
}