import { st } from "springtype/core";
import { component } from "springtype/web/component";
import { TodoList } from "./component/todo-list";
import { tsx } from "springtype/web/vdom";
import { Link } from "springtype/web/router";

@component
export default class TodoListPage extends st.component {

    render() {
        return <fragment>

            <Link>Back</Link>
            <TodoList />
        </fragment>
    }
}