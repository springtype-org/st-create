import { component } from "springtype/web/component";
import { st } from "springtype/core";
import { ILifecycle } from "springtype/web/component/interface";
import { tsx } from "springtype/web/vdom";
import { Link } from "springtype/web/router";
import { PATH_SERVICE_PAGE } from "../service/service-page.paths";
import { PATH_LOGIN_PAGE } from "../login/login-page.paths";
import { PATH_STYLING_PAGE } from "../styling/styling-page.paths";
import { PATH_TODO_PAGE } from "../todo/todo-page.paths";

@component
export class HomePage extends st.component implements ILifecycle {

    render() {
        return (
            <fragment>
                <h1>Home</h1>
                <ul>
                    <li><Link path={PATH_SERVICE_PAGE}>Demo: Service</Link></li>
                    <li><Link path={"login"}>Demo: Login</Link></li>
                    <li><Link path={PATH_STYLING_PAGE}>Demo: Styling</Link></li>
                    <li><Link path={PATH_TODO_PAGE}>Demo: Todo List</Link></li>
                </ul>
            </fragment>
        );
    }
}