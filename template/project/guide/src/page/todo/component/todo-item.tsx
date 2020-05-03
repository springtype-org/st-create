import { component, event, attr } from "springtype/web/component";
import { tsx } from "springtype/web/vdom";
import { st } from "springtype/core";
import { ref } from "springtype/core/ref";
import { IEventListener } from "springtype/web/component/interface";

export interface ITodoItemState {
    id: number;
    text: string;
    done: boolean;
}

export interface ITodoItemEventDetail {
    state: ITodoItemState;
}

export interface ITodoItemAttrs {
    state: ITodoItemState;
    onDoneStateChange: IEventListener<ITodoItemEventDetail>;
}

@component
export class TodoItem extends st.component<ITodoItemAttrs> {

    @ref
    inputRef: HTMLInputElement;

    @attr
    state: ITodoItemState;

    @event
    onDoneStateChange!: IEventListener<ITodoItemEventDetail>;

    onDoneInputChange = (evt: Event) => {

        this.setDone(!this.state.done);

        // dispatching "doneStateChange" triggers registered
        // onDoneStateChange event listeners
        this.dispatchEvent<ITodoItemEventDetail>("doneStateChange", {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: {
                state: this.state,
            },
        });
    };

    setDone(isDone: boolean) {
        this.state.done = isDone;
        this.inputRef.checked = this.state.done;
    }

    render() {
        return <span>
            <input
                onChange={this.onDoneInputChange}
                ref={{ inputRef: this }}
                type="checkbox"
                checked={this.state.done} />
            {this.state.text}
        </span>;
    }
}