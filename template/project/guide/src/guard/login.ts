import { service } from "springtype/core/service";
import { st } from "springtype/core";
import { inject } from "springtype/core/di";
import { IRouteMatch, IRouterGuardResponse } from "springtype/web/router/interface";
import { LoginService } from "../service/login";
import { PATH_LOGIN_PAGE } from "../page/login/login-page.paths";

@service
export class LoginGuard extends st.service {

  @inject(LoginService)
  loginService: LoginService;
    
  isLoggedIn = async (match: IRouteMatch): 
    Promise<IRouterGuardResponse> => {
    
    if (!await this.loginService.isLoggedIn()) {
      return PATH_LOGIN_PAGE;
    } else {
      return true;
    }
  }
}