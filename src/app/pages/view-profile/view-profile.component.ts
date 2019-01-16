import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../models/user.model';
import {UserService} from '../../services/service.index';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styles: []
})
export class ViewProfileComponent implements OnInit {
  userView: UserModel;

  constructor( _userService: UserService ) {
    this.userView = _userService.user;
  }

  ngOnInit() {
  }

}
