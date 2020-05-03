import { component } from "springtype/web/component";
import { st } from "springtype/core";
import { ILifecycle } from "springtype/web/component/interface";
import { tsx } from "springtype/web/vdom";
import { inject } from "springtype/core/di";
import { LoginService } from "../../service/login";

@component
export default class DashboardPage extends st.component implements ILifecycle {

    @inject(LoginService)
    loginService: LoginService;

    onLogoutClick = () => {
        this.loginService.logout();
    }

    render() {
        return (
            <fragment>
                <h1>Dashboard</h1>
                <h2>Welcome {this.loginService.username}!</h2>
                <button onClick={this.onLogoutClick}>Logout</button>
            </fragment>
        );
    }
}