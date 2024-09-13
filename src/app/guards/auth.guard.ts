import { authService } from "../servicios/auth.service";
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot ,CanActivateFn,Router} from "@angular/router";

export const AuthGuard:CanActivateFn =
(route:ActivatedRouteSnapshot, state:RouterStateSnapshot)=>{
    const AuthService = inject(authService);
    const router = inject(Router);

    AuthService.Logeado || router.navigate(["login"]);
    return true;
}