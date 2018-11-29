import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
}                           from '@angular/router';
import { HelperService }      from '../services/helper.service';

/**
 * Route Guard Service to implement Gaurd on Routing
 * I used it to check if valid Lease ID is passed.
 * 
 */
@Injectable({
  providedIn: 'root',
})
export class RouteGuard implements CanActivate, CanActivateChild {
  constructor(private helperService: HelperService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    
    let leaseId = route.params["id"];
    let lease = this.helperService.cachedLeases.find(item => item.id == leaseId);
    
    if(!lease) {
      this.router.navigate(['/not-found']);
    }
    return true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

/* . . . */
}
