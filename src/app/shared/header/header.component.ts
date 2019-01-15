import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/service.index';
import {UserModel} from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  user: UserModel;

  constructor( public _userService: UserService ) { }

  ngOnInit() {
    this.user = this._userService.user;
  }

}
