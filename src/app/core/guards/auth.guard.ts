import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkAuthState(state.url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(route, state);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    const url = segments.map((s) => `/${s}`).join('');
    return this.checkAuthState(url).pipe(take(1));
  }

  private checkAuthState(redirect: string): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      tap((is) => {
        if (!is) {
          this.router.navigate(['/login'], {
            queryParams: { redirect },
          });
        }
      })
    );
  }
}
