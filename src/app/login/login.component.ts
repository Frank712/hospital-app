import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserModel} from '../models/user.model';
import {UserService} from '../services/service.index';
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  remember: boolean = false;
  constructor(public router: Router,
              public userService: UserService ) { }

  ngOnInit() {
    init_plugins();
  }

  login( form: NgForm ) {
    const user = new UserModel(null, null, form.value.email, form.value.password );
    console.log('User in loginComponent: ', user);
    this.userService.login(user, this.remember).subscribe( resp => {
      console.log(resp);
    });
  }
}
