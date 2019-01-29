import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {
  constructor ( public _userService: UserService,
                public router: Router) {

  }
  canActivate( ): Promise<boolean> | boolean {
    console.log('Begin Verify tokenGuard');
    const token = this._userService.token;
    console.log(token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    console.log(payload);
    if ( this.expired(exp) ) {
      this.router.navigate(['/login']);
      return false;
    }
    return this.verifyRenew( exp );
  }

  verifyRenew( dateExp: number ): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      const tokenExp = new Date( dateExp * 1000 );
      const now = new Date();
      now.setTime( now.getTime() + ( 1 * 60 * 60 * 1000 ) );
      if ( tokenExp.getTime() > now.getTime() ) {
        resolve( true );
      } else {
        this._userService.renewToken().subscribe( () => {
          resolve(true);
        }, () => {
          this.router.navigate(['/login']);
          reject(false);
        } );
      }

    });
  }

  expired(dateExp: number) {
    const dateCurrent = new Date().getTime() / 1000;
    if ( dateExp < dateCurrent  ) {
      return true;
    } else {
      return false;
    }
  }
}
