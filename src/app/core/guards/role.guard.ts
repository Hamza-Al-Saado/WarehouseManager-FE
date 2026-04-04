import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private auth: AuthService, private router: Router) { }

    private checkRoles(expectedRoles?: string[] | null): boolean | UrlTree {
        if (!this.auth.isAuthenticated()) {
            return this.router.createUrlTree(['/auth/login'], {
                queryParams: { returnUrl: this.router.url }
            });
        }

        if (!expectedRoles || expectedRoles.length === 0) return true;

        if (this.auth.hasAnyRole(expectedRoles)) return true;

        return this.router.createUrlTree(['/unauthorized']);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {

        const isLoggedIn = this.auth.isAuthenticated();

        if (isLoggedIn && state.url.includes('/auth/login')) {
            return false;
        }

        const roles = route.data['roles'] as string[] | undefined;

        return this.checkRoles(roles);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const roles = childRoute.data['roles'] as string[] | undefined;
        return this.checkRoles(roles);
    }

    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
        const roles = route.data && (route.data['roles'] as string[] | undefined);
        return this.checkRoles(roles);
    }
}
