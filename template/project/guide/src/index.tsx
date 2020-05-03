import { st } from "springtype/core";
import { component } from "springtype/web/component";
import { ILifecycle } from "springtype/web/component/interface";
import { tsx } from "springtype/web/vdom";
import { RouteList, Route, PATH_WILDCARD, PATH_START } from "springtype/web/router";

import { HomePage } from "./page/home/home-page";
import { PATH_HOME_PAGE } from "./page/home/home-page.paths";
import { PATH_SERVICE_PAGE } from "./page/service/service-page.paths";
import { runInContext } from "vm";
import { ErrorMessage } from "./component/error-message-demo";
import { PATH_LOGIN_PAGE } from "./page/login/login-page.paths";
import { Container } from "./component/functional-container-demo";
import { Clock } from "./component/functional-clock";
import SimplePanel from "./component/simple-panel";
import { ComplexPanel } from "./component/complex-panel";
import { PATH_STYLING_PAGE } from "./page/styling/styling-page.paths";
import { FragmentDemo } from "./component/fragment-demo";

// you can easily import global CSS StyleSheets like this
import "../style/theme.scss";
import { PATH_TODO_PAGE } from "./page/todo/todo-page.paths";
import { inject } from "springtype/core/di";
import { LoginService } from "./service/login";
import { PATH_DASHBOARD_PAGE } from "./page/dashboard/dashboard-page.paths";
import { LoginGuard } from "./guard/login";

@component
export class Guide extends st.component implements ILifecycle {

  @inject(LoginGuard)
  loginGuard: LoginGuard;

  render() {
    return (
      <RouteList>
        {/* Match: /, /home and any route that doesn't match to other <Route />'s */}
        <Route path={[PATH_START, PATH_WILDCARD, PATH_HOME_PAGE]}>
          <HomePage />
        </Route>
        {/* Code split: This component is only loaded when the route matches */}
        <Route path={PATH_SERVICE_PAGE}>
          <template slot={Route.SLOT_NAME_LOADING_COMPONENT}>
            <p>Loading...</p>
          </template>
          {() => import('./page/service/service-page')}
        </Route>
        <Route path={PATH_LOGIN_PAGE}>
          {() => import('./page/login/login-page')}
        </Route>
        <Route path={PATH_STYLING_PAGE}>
          {() => import('./page/styling/styling-page')}
        </Route>
        <Route path={PATH_TODO_PAGE}>
          {() => import('./page/todo/todo-page')}
        </Route>
        {/* Checks for loggedIn state */}
        <Route path={PATH_DASHBOARD_PAGE} guard={this.loginGuard.isLoggedIn}>
          {() => import('./page/dashboard/dashboard-page')}
        </Route>
      </RouteList>
    );
  }
}

// to render the app, run:
st.render(<Guide />);

// ===
// DEMOS
//
// Enable them, to play around with various features of SpringType.
// Make sure to uncomment the above st.render(<Guide />) call first!
//
// ===

/* uncomment this to try rendering TSX:

st.render(
  <p>SpringType: Simplicity is key! :-)</p>
);
*/

// st.render renders to document.body by default

// to render some demo component (guide), run e.g.: (see imports above)
//st.render(<FragmentDemo />);

// rendering an error message with outer native DOM attributes
//st.render(<ErrorMessage message="foo" style={{ color: '#cc0000' }} shinesThrough="yes" />)

/*
st.render(<ErrorMessage message="What do you know :)"
    id="foo1"
    tabIndex={1}
    class={['a', 'b']}
    style={{
        color: '#cc0000'
    }}
/>);
*/

/*
st.render(<Container>
  <strong>Rendered inside container</strong>
</Container>);
*/

// rendering a functional Clock component
//st.render(<Clock />)

// SimplePanel
/*
st.render(<SimplePanel>
  <ErrorMessage message="Mayday, mayday!" />
</SimplePanel>
)
*/

// ComplexPanel
/*
st.render(
  <p>
    <ComplexPanel>
      <template slot={ComplexPanel.HEADER}>
        <div>MyHeader</div>
      </template>

      <template slot={ComplexPanel.FOOTER}>
        <div>MyFooter</div>
      </template>

      <span>MyContent</span>
    </ComplexPanel>
  </p>
);
*/