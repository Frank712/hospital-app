import { Injectable } from '@angular/core';
import {UserModel} from '../../models/user.model';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICES} from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( public http: HttpClient) {
    console.log('UserService ready!');
  }

  login( user: UserModel, remember: any ) {
    const url = URL_SERVICES + '/login';
    return this.http.post(url, user);
  }

  createUser( user: UserModel ) {
    const url = URL_SERVICES + '/users';
    return this.http.post( url, user)
      .pipe( map((resp: any) => {
        swal('User created', user.email, 'success');
        return resp.user;
      }));
  }
}
