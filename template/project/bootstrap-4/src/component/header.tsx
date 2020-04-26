import { st } from "springtype/core";
import { component } from "springtype/web/component";
import { tsx } from "springtype/web/vdom";
import { PricingPageRoute } from "../page/pricing";
import { SigninPageRoute } from "../page/signin";
import { Link } from "springtype/web/router";
import { FeaturesPageRoute } from "../page/features";
import { CheckoutPageRoute } from "../page/checkout";

import "./header.css";

@component
export class Header extends st.component {

    render() {
        return <header>
            <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                <h5 class="my-0 mr-md-auto font-weight-normal">Company name</h5>
                <nav class="my-2 my-md-0 mr-md-3">

                    <Link class="p-2 text-dark" path={FeaturesPageRoute}>Features</Link>
                    <Link class="p-2 text-dark" path={CheckoutPageRoute}>Checkout</Link>
                    <Link class="p-2 text-dark" path={PricingPageRoute}>Pricing</Link>
                </nav>
                <Link class="btn btn-outline-primary" path={SigninPageRoute}>Sign in</Link>
            </div>

        </header>
    }
}