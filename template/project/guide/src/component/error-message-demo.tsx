import { st } from "springtype/core";
import { tsx } from "springtype/web/vdom";
import { AttrType } from "springtype/web/component/interface";
import { component, attr } from "springtype/web/component";
import { ref } from "springtype/core/ref";

// this interface allows for an auto-completable 
// API when using the <ErrorMessage /> component 
// in a modern IDE like VS Code or IntelliJ IDEA / WebStorm
export interface IErrorMessageAttrs {
    message: string;
    shinesThrough: string;
}

@component
export class ErrorMessage extends st.component<IErrorMessageAttrs> {

    // sets a specific DOM tag name
    tag = 'my-error-message';

    // this attribute it not transparent; it doesn't 
    // shine through to the DOM, thus it's not being
    // rendered in the resulting HTML representation
    @attr
    message: string = "Hello, world!";

    // this attribute shines throuh in DOM
    @attr(AttrType.DOM_TRANSPARENT)
    shinesThrough: string = "someValueShinesThrough";

    @ref
    messageDisplayRef: HTMLParagraphElement;

    setMessage(message: string) {
        
        // update local state
        this.message = message;

        // trigger UI update
        this.renderPartial(this.message, this.messageDisplayRef);
    }

    render() {
        return <p ref={{ messageDisplayRef: this }}>{this.message}</p>;
    }
}