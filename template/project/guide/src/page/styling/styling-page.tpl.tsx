// tsx function is needed for TSX to JSON transform processing
import { tsx } from "springtype/web/vdom";
import { Link } from "springtype/web/router";

// class import to reference the component scope
import StylingPage from "./styling-page";

// CSS typed stylesheet import (SCSS here, but you can use Less, Sass, CSS syntax too)
// Styles that need pre-processing will auto-transpiled
// @ts-ignore
import * as styles from "./css-demo.tss.scss";

// Classic import (no typings; no unique class names)
import "./css-demo.scss";

// @ts-ignore
import springTypeLogo from "../../../static/img/springtype-logo.png";

const fontColor = "#0000cc";

export default (component: StylingPage) => (
    <fragment>
        {/* We aren't providing any "path" attribute here, 
            thus it's empty and leads to the root page */}
        <Link>Back</Link>

        <h1>Styling</h1>

        {/* Typed Style Sheets allow for auto-completable 
            class names and unique class names for each import */}
        <div class={styles.container}>
            Typed StyleSheet (TSS) import
        </div>

        {/* Classic import */}
        <div class="container bordered rounded padded">
            Classic StyleSheet import
        </div>

        {/* Classic import, with array syntax */}
        <div class={[styles.container, "bordered", "rounded", "padded"]}>
            Classic StyleSheet import, array syntax
        </div>

        <div class={["container"]}>

            {/* Inline styles in JSON syntax allow for auto-completable CSS API */}
            <p style={{ color: '#cc0000' }}>Inline style demo, JSON syntax</p>
        </div>

        <div class={["container"]}>

            {/* Classic inline style syntax, with dynamic template string */}
            <p style={`color: ${fontColor}`}>Inline style demo, JSON syntax</p>
        </div>

        {/* Dynamic asset import example */}
        <img src={springTypeLogo} />

    </fragment>
);