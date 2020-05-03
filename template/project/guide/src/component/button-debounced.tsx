import { component, event } from "springtype/web/component";
import { st } from "springtype/core";
import { tsx } from "springtype/web/vdom";
import { debounce } from "springtype/core/lang/debounce";
import { IEventListener, IEvent } from "springtype/web/component/interface";

export interface IButtonDebouncedAttrs {

    /**
     * Debounce time in milliseconds; default: 1000
     */
    debounceTimeMs: number;

    /**
     * Fired on debounced click
     */
    onClickDebounced: IEventListener<void, MouseEvent>;
}

@component
export class ButtonDebounced extends st.component<IButtonDebouncedAttrs> {

    static readonly EVENT_CLICK_DEBOUNCED = 'clickdebounced';

    @event
    onClickDebounced: IEventListener<void, MouseEvent>;

    debounceTimeMs: number = 1000;

    onBeforeConnect() {
        
        // assigning the debounced click handler here, 
        // because the local state this.debounceTimeMs is just 
        // accessible after instance contruction time.
        // debounce() makes sure that the function is called
        // only once in a timeframe (see: Introduction / A. About TypeScript / 5. Reactive)
        this.onButtonClick = debounce((evt: MouseEvent) => {

            st.info('dispatching a debounced click event', evt);
    
            // dispatch/relay the native DOM event received
            this.dispatchEvent(ButtonDebounced.EVENT_CLICK_DEBOUNCED, evt);

        }, this.debounceTimeMs);
    }

    onButtonClick = () => {} // replaced by reference in this.onBeforeConnect

    render() {
        return <button onClick={this.onButtonClick}>{this.renderChildren('Click')}</button>
    }
}