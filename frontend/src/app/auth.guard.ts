import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }
  
  checkLogin(){
    let userInfo = localStorage.getItem('USER_DATA');

    if (userInfo) {
      let user = JSON.parse(userInfo).user;
      if(user){
        return true
      }
      

      return false
    }
    return false
  }
}
