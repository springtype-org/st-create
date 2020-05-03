import { st } from "springtype/core";
import { ref } from "springtype/core/ref";
import { component, attr } from "springtype/web/component";

// external TSX template import
import tpl from "./login-page.tpl";
import { TOPIC_LOGIN, ILoginEvent } from "../../service/login";

@component({
    // passes the template function reference to the component  
    tpl
})
export default class LoginPage extends st.component {

    @ref
    usernameRef: HTMLInputElement;

    @ref
    passwordRef: HTMLInputElement;

    onLoginClick = (evt: MouseEvent) => {
        
        st.log('Login clicked...', 'username:', this.usernameRef.value, 'password:', this.passwordRef.value);

        // send message bus event to trigger login operation
        st.sendMessage<ILoginEvent>(TOPIC_LOGIN, {
            username: this.usernameRef.value,
            password: this.passwordRef.value
        });
    }
}