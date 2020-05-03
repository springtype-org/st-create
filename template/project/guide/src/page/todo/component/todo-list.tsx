import { component, event } from "springtype/web/component";
import { st } from "springtype/core";
import { tsx } from "springtype/web/vdom"; 
import { TodoItem, ITodoItemState, ITodoItemEventDetail } from "./todo-item";
import { IEvent } from "springtype/web/component/interface";

@component
export class TodoList extends st.component {
    
  items: Array<ITodoItemState> = [{
    id: 1,
    done: false,
    text: "Max"
  }, {
    id: 2,
    done: true,
    text: "Julia"
  }];
    
  onItemDoneStateChange(evt: IEvent<ITodoItemEventDetail>) {
    st.info('item id', evt.detail.state.id);
    st.info('item name', evt.detail.state.text);
    st.info('item done?', evt.detail.state.done);
  }
    
  render() {
    return <ul>{
      this.items.map((itemState: ITodoItemState) => 
        <li><TodoItem state={itemState} onDoneStateChange={this.onItemDoneStateChange} /></li>
      )
    }</ul>
  }
}