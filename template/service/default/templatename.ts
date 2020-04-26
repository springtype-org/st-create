import { st } from "springtype/core";
import { service } from "springtype/service";

/**
 * A simple service. Inject this service in components and other services using:
 * 
 * @inject(TemplateNameService)
 * templateNameService: TemplateNameService;
 */
@service
export class TemplateName extends st.service {

  getNewRandom(): number {
    return Math.random();
  }
}