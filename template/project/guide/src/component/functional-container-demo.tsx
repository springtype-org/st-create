import { tsx } from "springtype/web/vdom";
import { component, Component, render } from "springtype/web/component";

// simplified functional component, just renders what is given
export const Container = component(
    render((container: Component) => {
        return <div>{container.renderChildren()}</div>;
    })
);

/*
st.render(
  <Container>
    <strong>Rendered inside container</strong>
  </Container>
);

would be rendered as:

<fnc-1>
  <div><strong>Rendered inside container</strong></div>
</fnc-1>
*/