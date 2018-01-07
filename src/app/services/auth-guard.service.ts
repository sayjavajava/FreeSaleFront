import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
 

  constructor(private authservice :AuthenticationService,private router:Router) {

   }

  canActivate(route,state:RouterStateSnapshot){
    if(this.authservice.isLoggedIn())  return true;
     console.log('urlstr2:'+state.url);
  this.router.navigate(['login']), { queryParams: {returnUrl:state.url}};
    return false;
  }

}
