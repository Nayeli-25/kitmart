import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthGuard implements CanActivate {
  router2:Router
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {​​​
      const token = localStorage.getItem('personalToken')
      if (token == null){​​​​
        this.router2.navigate(['/login']);
        return false
      }​​​​
      return true
  }​​​​
}