import { st } from "springtype/core";
import { service } from "springtype/core/service";
import { onMessage } from "springtype/core/event-bus/decorator/on-message";
import { PATH_DASHBOARD_PAGE } from "../page/dashboard/dashboard-page.paths";
import { PATH_LOGIN_PAGE } from "../page/login/login-page.paths";

export interface ILoginEvent {
    username: string;
    password: string;
}
export const TOPIC_LOGIN = 'LoginService:login';

/**
 * Simple login service communicating via Reactive Event Bus.
 * 
 * Inject this service in components and other services using:
 * 
 * @inject(LoginService)
 * loginService: LoginService;
 */
@service
export class LoginService extends st.service {

    loggedIn: boolean = false;
    username: string;

    @onMessage(TOPIC_LOGIN)
    onLogin(loginEvent: ILoginEvent) {

        console.log('LoginService: logging in using credentials....', loginEvent);
        
        // mock login state mutation
        this.loggedIn = true;
        this.username = loginEvent.username;

        // redirect to dashboard page
        // now the guard will match
        st.route = {
            path: PATH_DASHBOARD_PAGE
        }
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    logout() {
        this.loggedIn = false;
        st.route = {
            path: PATH_LOGIN_PAGE
        } 
    }
}