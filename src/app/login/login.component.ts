import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserModel} from '../models/user.model';
import {UserService} from '../services/service.index';
declare function init_plugins();
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  remember: boolean = false;
  auth2: any;
  constructor(public router: Router,
              public userService: UserService ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 0 ) {
      this.remember = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '952339169567-gj8edoakhhgairtov5h671q6silseqj4.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSigIn( document.getElementById('btn-google'));
    });
  }

  attachSigIn( element) {
    this.auth2.attachClickHandler( element, {}, googleUser => {
      const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this.userService.loginGoogle( token ).subscribe( resp => {
        window.location.href = '#dashboard';
      });
    });

  }

  login( form: NgForm ) {
    const user = new UserModel(null, null, form.value.email, form.value.password );
    this.userService.login(user, this.remember).subscribe( resp => {
      this.router.navigate(['/dashboard']);
    });
  }
}
