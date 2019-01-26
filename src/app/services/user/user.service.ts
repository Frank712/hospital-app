import { Injectable } from '@angular/core';
import {UserModel} from '../../models/user.model';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICES} from '../../config/config';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UploadFileService} from '../uploadFile/upload-file.service';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserModel;
  token: string;
  menu: any = [];

  constructor( public http: HttpClient,
               public router: Router,
               public _ufService: UploadFileService) {
    this.loadStorage();
  }

  loadStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }

  saveStorage( id: string, token: string, user: UserModel, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.user = user;
    this.token = token;
    this.menu = menu;
  }

  loginGoogle( token: string ) {
    const url = URL_SERVICES + '/login/google';
    return this.http.post(url, { token }).pipe( map( (resp: any) => {
      this.saveStorage( resp.id, resp.token, resp.user, resp.menu);
      return true;
    }));
  }

  login( user: UserModel, remember: boolean ) {
    if (remember ) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICES + '/login';
    return this.http.post(url, user).pipe( map( (resp: any) => {
      if ( resp.ok ) {
        this.saveStorage( resp.id, resp.token, resp.user, resp.menu );
        return true;
      }
    }),
      catchError( (errorCatchable: any) => {
        Swal.fire({
          title: 'Error',
          text: errorCatchable.error.message,
          type: 'error'
        });
        console.log(errorCatchable);
        return new Observable<any>();
      }));
  }

  isLogin() {
    if ( this.token === null ) {
      return;
    } else {
      return this.token.length > 5;
    }

  }

  logout() {
    this.token = '';
    this.user = null;
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  createUser( user: UserModel ) {
    const url = URL_SERVICES + '/users';
    return this.http.post( url, user)
      .pipe( map((resp: any) => {
        Swal.fire('User created', user.email, 'success');
        return resp.user;
      }),
        catchError( (errorCatchable: any) => {
          Swal.fire({
            title: errorCatchable.error.error.errors.email.name,
            text: errorCatchable.error.error.errors.email.message,
            type: 'error'
          });
          /*swal({
            title: errorCatchable.error.error.errors.email.name,
            text: errorCatchable.error.error.errors.email.message,
            icon: 'error'
          });*/
          console.log(errorCatchable.error.error);
          return new Observable<any>();
        })
        );
  }

  updateUser( user: UserModel ) {
    let url = URL_SERVICES + '/users/' + user._id;
    url += '?token=' + this.token;
    return this.http.put(url, user).pipe( map( (resp: any) => {
      if ( this.user._id === user._id ) {
        const userDB = resp.user;
        this.saveStorage( user._id, resp.token, userDB, this.menu);
      }
      /*Swal.fire('User updated', 'The user ' + user.name + ' has been updated successfully', 'success');*/
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: `The user ${user.name} has been updated successfully`,
        showConfirmButton: false,
        timer: 1500
      })
      return true;
    }));
  }

  updateImage( file: File, id: string ) {
    this._ufService.uploadFile( file, 'users', id)
      .then( (resp: any) => {
        this.user.img = resp.user.img;
        Swal.fire( resp.message, this.user.img, 'success' );
        this.saveStorage( id, this.token, this.user, this.menu );
        console.log(resp);
      })
      .catch( resp => {
        console.log(resp);
      });
  }

  loadUsers( _from: number ) {
    const url = URL_SERVICES + '/users?_from= + ' + _from;
    return this.http.get(url);
  }

  searchUsers( term: string ) {
    const url = URL_SERVICES + '/search/collection/users/' + term;
    return this.http.get(url);
  }

  deleteUser( id: string ) {
    const url = URL_SERVICES + '/users/' + id + '?token=' + this.token;
    return this.http.delete(url);
  }
}
