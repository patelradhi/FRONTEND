w// some changes according to our requirement like (* navigate to path according our requirememt)

import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import { AuthService } from "./auth.service";   
import { Observable } from "rxjs";
import { take,map } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authService.getAuthStatus().pipe(
            take(1),
            map(isAuthenticated => {
                if (!isAuthenticated) {
                     // Redirect to the default page
                   return  this.router.parseUrl('')
                //    this.router.navigate([''])
                }
                return true;
            })
        );
    }
}
