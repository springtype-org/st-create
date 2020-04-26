import { st } from "springtype/core";
import { tsx } from "springtype/web/vdom";
import { component } from "springtype/web/component";
import { RouteList, Route, PATH_START, PATH_WILDCARD } from "springtype/web/router";
import { PricingPage, PricingPageRoute } from "./page/pricing";
import { SigninPage, SigninPageRoute } from "./page/signin";
import { FeaturesPage, FeaturesPageRoute } from "./page/features";
import { CheckoutPage, CheckoutPageRoute } from "./page/checkout";
//import { importBootstrap } from "st-bootstrap";

import "./bootstrap.scss";

@component
export class TemplateNameMain extends st.component {
    render() {
        return <RouteList>
            <Route path={[FeaturesPageRoute, PATH_START, PATH_WILDCARD]}><FeaturesPage /></Route>
            <Route path={PricingPageRoute}><PricingPage /></Route>
            <Route path={[SigninPageRoute]}><SigninPage /></Route>
            <Route path={[CheckoutPageRoute]}><CheckoutPage /></Route>
        </RouteList>
    }
}

st.run(async() => {

    // if you plan to import 'boostrap' JS and it's dependencies (jQuery, popper.js) in the application JS bundle
    //await importBootstrap();

    // trigger the initial render to <body>
    st.render(<TemplateNameMain />);
});
