import { Injectable } from '@angular/core';
import {UserModel} from '../../models/user.model';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICES} from '../../config/config';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';
import {UploadFileService} from '../uploadFile/upload-file.service';
declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserModel;
  token: string;

  constructor( public http: HttpClient,
               public router: Router,
               public _ufService: UploadFileService) {
    console.log('UserService ready!');
    this.loadStorage();
  }

  loadStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  saveStorage( id: string, token: string, user: UserModel) {
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.token = token;
  }

  loginGoogle( token: string ) {
    const url = URL_SERVICES + '/login/google';
    return this.http.post(url, { token }).pipe( map( (resp: any) => {
      this.saveStorage( resp.id, resp.token, resp.user);
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
      this.saveStorage( resp.id, resp.token, resp.user );
      return true;
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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  createUser( user: UserModel ) {
    const url = URL_SERVICES + '/users';
    return this.http.post( url, user)
      .pipe( map((resp: any) => {
        swal('User created', user.email, 'success');
        return resp.user;
      }));
  }

  updateUser( user: UserModel ) {
    let url = URL_SERVICES + '/users/' + user._id;
    url += '?token=' + this.token;
    return this.http.put(url, user).pipe( map( (resp: any) => {
      if ( this.user._id === user._id ) {
        const userDB = resp.user;
        this.saveStorage( user._id, resp.token, userDB);
      }
      swal( 'User updated', 'The user ' + user.name + ' has been updated successfully', 'success' );
      return true;
    }));
  }

  updateImage( file: File, id: string ) {
    this._ufService.uploadFile( file, 'users', id)
      .then( (resp: any) => {
        this.user.img = resp.user.img;
        swal( resp.message, this.user.img, 'success' );
        this.saveStorage( id, this.token, this.user );
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
    const url = URL_SERVICES + '/users/' + id + '?token=' +this.token;
    return this.http.delete(url);
  }
}
