import { st } from "springtype/core";
import { ref } from "springtype/core/ref";
import { component } from "springtype/web/component";
import { ILifecycle } from "springtype/web/component/interface";
import { tsx } from "springtype/web/vdom";

// you can easily use global CSS stylesheets like this
import "../assets/theme.scss";

@component
export class TemplateName extends st.component implements ILifecycle {

  // this is the way we get a hold on DOM API element references
  @ref
  messageRef: HTMLElement;

  // local message state
  message: string = 'Not clicked yet';

  changeName = () => {

    st.log('You clicked the button. And the message element is: ', this.messageRef);

    // update local state
    this.message = 'You clicked the button.';

    // update view explicitly
    this.renderPartial(this.message, this.messageRef);
  }

  render() {
    return (
      <div >
        <p ref={{ messageRef: this }}>{this.message}</p>
        <br />
        <button onClick={this.changeName}>Click me</button>
      </div>
    );
  }
}

// tells SpringType to render this component now
st.render(<TemplateName />);
