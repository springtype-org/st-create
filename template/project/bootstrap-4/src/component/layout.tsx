import { st } from "springtype/core";
import { component } from "springtype/web/component";
import { tsx } from "springtype/web/vdom";
import { Header } from "./header";
import { Footer } from "./footer";

@component
export class Layout extends st.component {

    static SLOT_MAIN = "main";
    static SLOT_NAVIGATION = "nav";

    render() {
        return <fragment>
            <Header />

            <div class="container-fluid">
                {this.renderSlot(Layout.SLOT_MAIN)}
                <Footer />
            </div>

        </fragment>
    }
}