import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../models/user.model';
import {UserService} from '../../services/service.index';
import {ModalUploadService} from '../../components/modal-upload/modal-upload.service';
declare var swal: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  users: UserModel[] = [];
  _from = 0;
  registerTotal = 0;
  prevBut: boolean = true;
  nextBut: boolean = true;
  loadingUser: boolean;
  totalSearch = 0;
  plural = false;
  searching = false;

  constructor( public _userService: UserService,
               public _modUpServices: ModalUploadService ) { }

  ngOnInit() {
    this.loadUsers();
    this._modUpServices.notification.subscribe( (resp) =>{
      this.loadUsers();
    });
  }

  loadUsers() {
    this.loadingUser = true;
    this._userService.loadUsers(this._from).subscribe( (resp: any) => {
      this.users = resp.users;
      this.registerTotal = resp.counter;
      if (this.registerTotal > 5 ) {
        this.nextBut = false;
      }
    });
    this.searching = false;
    this.loadingUser = false;
  }

  changeFrom( value: number ) {
    const _from = this._from + value;
    if ( _from > this.registerTotal ) {
      this.nextBut = true;
      this.prevBut = false;
      return;
    }
    if ( _from < 0 ) {
      this.prevBut = true;
      this.nextBut = false;
      return;
    }
    this._from += value;
    this.prevBut = false;
    this.nextBut = false;
    this.loadUsers();
  }

  searchUser( term: string ) {
    this.loadingUser = true;
    if ( term.length <= 0 ) {
      this.loadUsers();
      return;
    }
    this._userService.searchUsers(term).subscribe((resp: any) => {
      this.users = resp.users;
      this.totalSearch = resp.users.length;
      this.plural = !(this.totalSearch === 1);
      this.searching = true;
      this.loadingUser = false;
    });
  }

  deleteUser( user: UserModel ) {
    if ( user._id === this._userService.user._id ) {
      swal('Error!', 'You can\'t delete yourself', 'error');
      return;
    }
    swal({
      title: 'Are you sure?',
      text: 'You are about to delete the user ' + user.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
      .then( willDelete => {
        if ( willDelete ) {
          this._userService.deleteUser(user._id).subscribe( (resp: any) => {
            console.log(resp);
            if ( resp.ok ) {
              swal( 'User deleted', 'The user ' + user.name + ' has been deleted successfully', 'success' );
              this.loadUsers();
            } else {
              swal( 'Error delete', 'The user could\'t deleted', 'error' );
            }
          });
        }
      });
  }

  showModalImage( id: string ) {
    this._modUpServices.showModal( 'users', id );
  }

  saveUser( user: UserModel ) {
    this._userService.updateUser( user )
      .subscribe();
  }

}
