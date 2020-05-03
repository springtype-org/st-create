import { st } from "springtype/core";
import { service } from "springtype/core/service";

export interface IRandomCatResponse {
  file: string;
}

/**
 * A simple cat service, returning random cats, one meow at a time. 
 * 
 * This example demonstrates the st-start API proxy feature for a
 * stellar developer experience: You can run your local development 
 * service and leave the URL's the same as for the production environment.
 * The proxy will relay the connections to your local development server.
 * TLS (HTTPS) offloading is supported as well.
 * 
 * Inject this service in components and other services using:
 * 
 * @inject(CatService)
 * catService: CatService;
 */
@service
export class CatService extends st.service {

  async getRandomCat(): Promise<IRandomCatResponse> {
    // see st.config.ts proxy
    return (await fetch('/meow')).json();
  }
}