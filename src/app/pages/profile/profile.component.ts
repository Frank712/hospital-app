import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../models/user.model';
import {UserService} from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  confirm: boolean = false;
  user: UserModel;
  newPass1: string = '';
  newPass2: string = '';

  constructor( public _userService: UserService) {
    this.user = this._userService.user;
  }

  ngOnInit() {
  }

  editProfile( form) {
    console.log(form);
  }

}
