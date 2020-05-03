import { component } from "springtype/web/component";
import { st } from "springtype/core";
import { ILifecycle } from "springtype/web/component/interface";
import { tsx } from "springtype/web/vdom";
import { CatService } from "../../service/cat";
import { inject } from "springtype/core/di";
import { ref } from "springtype/core/ref";
import { debounce } from "springtype/core/lang/debounce";
import { Link } from "springtype/web/router";
import { ButtonDebounced } from "../../component/button-debounced";

@component
export default class ServicePage extends st.component implements ILifecycle {

    @ref
    catImgRef: HTMLImageElement;

    @inject(CatService)
    catService: CatService;

    async fetchAndRenderCatImg() {

        // set SVG loading image
        this.catImgRef.src = '/static/img/loading-spinner.svg';

        const randomCat = await this.catService.getRandomCat();

        // set cat image fetched
        this.catImgRef.src = randomCat.file;
    }

    render() {
        return (
            <fragment>
                <Link>Back</Link>

                <h1>Service demo</h1>
                <p>
                    Fetch and display a random cat:
                </p>

                <ButtonDebounced
                    debounceTimeMs={500}
                    onClickDebounced={this.onRefreshClick}>Refresh (debounced)</ButtonDebounced>

                <br />

                <img style={{ maxWidth: '50vw' }} ref={{ catImgRef: this }} />

            </fragment>
        );
    }

    onAfterRender() {
        this.fetchAndRenderCatImg();
    }

    onRefreshClick = (evt: MouseEvent) => {
        this.fetchAndRenderCatImg();
    }
}