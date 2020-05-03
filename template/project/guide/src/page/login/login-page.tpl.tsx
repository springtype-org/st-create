// tsx function is needed for TSX to JSON transform processing
import { tsx } from "springtype/web/vdom";

// class import to reference the component scope
import LoginPage from "./login-page";
import { Link } from "springtype/web/router";
import { st } from "springtype/core";

export default (component: LoginPage) => (
    <fragment>
        <Link>Back</Link>

        <h1>Login</h1>
        <div class="container">

            Username:<br />
            <input ref={{ usernameRef: component }} type="text" name="username" value={st.route.params.username as string || 'test'} />

            <br /><br />

            Password:<br />
            <input ref={{ passwordRef: component }} type="password" name="password" value="demo" />

            <br /><br />

            <button onClick={component.onLoginClick}>
                Login!
            </button>
        </div>
    </fragment>
);