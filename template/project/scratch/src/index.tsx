import { st } from "springtype/core";
import { ref } from "springtype/core/ref";
import { component, state } from "springtype/web/component";
import { ILifecycle } from "springtype/web/component/interface";
import { tsx } from "springtype/web/vdom";

// you can easily use global CSS stylesheets like this
import "../assets/theme.scss";

@component
export class TemplateName extends st.component implements ILifecycle {

  // this is the way we get a hold on DOM API element references
  @ref
  messageDiv: HTMLDivElement;

  // if a state is mutated, 
  // render() gets called and the VDOM patches the DOM
  @state
  message: string = 'This is the scratch app template.';

  changeName = () => {
    st.log('You clicked the button. And the message element is: ', this.messageDiv);
    this.message = 'You clicked the button.';
  }

  render() {
    return (
      <div ref={{ messageDiv: this }}>
        message: {this.message}
        <br />
        <button onClick={this.changeName}>Click me</button>
      </div>
    );
  }
}

// tells SpringType to render this component now
st.render(<TemplateName />);
