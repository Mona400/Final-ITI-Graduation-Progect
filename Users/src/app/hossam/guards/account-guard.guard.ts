import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AccountGuardGuard implements CanActivate {
  /**
   *
   */

  constructor( private sh:SharedService , private  _router:Router ) {


  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log(this.sh.my_checkAuth())

    if(!this.sh.my_checkAuth()){
      this._router.navigateByUrl('/login')
      Swal.fire("You Need to login" , "You need to be logged in",'info')
      return false
    }else{
      return true
    }
  }



}
