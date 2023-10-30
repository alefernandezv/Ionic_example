import { Injectable,inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {NavController} from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class NoIngresadoGuard implements CanActivate {
  navCtrl=inject(navController)
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('ingresado')){
      this.navCtrl.navigateRoot('home');
      return false;
    }else{
      return true;
    }
  }

}
