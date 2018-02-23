import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { retry } from 'rxjs/operator/retry';
 
@Injectable()
export class AuthGuard implements CanActivate {
    public currentUser = JSON.parse(localStorage.getItem('currentUser'));
    constructor(private router: Router) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let roles = route.data["roles"] as Array<string>;
        if (localStorage.getItem('currentUser')) { 
            //console.log("this is allowed:"+this.currentUser.Role+'='+route.data.roles);
            if(route.data.roles[0] === this.currentUser.Role){
                return true;
            }else if(route.data.roles[1] === this.currentUser.Role){
                return true;
            }else if(route.data.roles[2] === this.currentUser.Role){
                return true;
            }
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}