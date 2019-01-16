import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  users: UserModel[] = [];

  constructor() { }

  ngOnInit() {
  }

}
