import { Component, OnInit } from '@angular/core';
import {SidebarService, UserService} from '../../services/service.index';
import {UserModel} from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`.has-arrow.waves-effect.waves-dark.active {
  background-color: transparent;
 }`]
})
export class SidebarComponent implements OnInit {
  user: UserModel;
  constructor( public _sidebarService: SidebarService,
               public _userService: UserService ) { }

  ngOnInit() {
    this.user = this._userService.user;
    this._sidebarService.loadMenu();
  }

}
