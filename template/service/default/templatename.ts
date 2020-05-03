import { st } from "springtype/core";
import { service } from "springtype/core/service";

/**
 * A simple service. Inject this service in components and other services using:
 * 
 * @inject(TemplateName)
 * templateName: TemplateName;
 */
@service
export class TemplateName extends st.service {

  getNewRandom(): number {
    return Math.random();
  }
}