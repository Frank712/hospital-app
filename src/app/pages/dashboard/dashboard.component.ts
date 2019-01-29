import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/service.index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor( private _userService: UserService) { }

  public user = this._userService.user;
  public isAdmin = this._userService.user.role === 'ADMIN_ROLE';
  ngOnInit() {

  }

}
