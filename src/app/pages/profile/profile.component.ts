import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../models/user.model';
import {UserService} from '../../services/service.index';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  confirm: boolean = false;
  user: UserModel;
  imageUpload: File;
  imageTemp: string;
  newPass1: string = '';
  newPass2: string = '';

  constructor( public _userService: UserService,
               public router: Router) {
    this.user = this._userService.user;
  }

  ngOnInit() {
  }

  editProfile( form ) {
    if ( !form.confirm ) {
      Swal.fire( 'Important', 'You must confirm the changes', 'warning' );
      return;
    }
    this.user.name = form.name;
    this.user.lastname = form.lastname;
    this.user.email = this.user.google ? this.user.email : form.email;

    this._userService.updateUser(this.user).subscribe( (resp: any) => {
      console.log(resp);
      if ( resp ) {
        this.router.navigate(['/view_profile']);
        return;
      } else {
        Swal.fire({
          title: resp.error.error.errors.email.name,
          text: resp.error.error.errors.email.message,
          type: 'error'
        });
        console.log(resp);
      }

    });
  }

  imageSelected( file: File ) {
    if ( !file ) {
      this.imageUpload = null;
      return;
    }

    if ( file.type.indexOf('image') < 0 ) {
      Swal.fire('Only images', 'The selected file is not a image', 'error');
      this.imageUpload = null;
      return;
    }
    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL(file);
    reader.onloadend = () => this.imageTemp = reader.result.toString();

    this.imageUpload = file;
  }

  changeImage() {
    this._userService.updateImage( this.imageUpload, this.user._id );
    this.imageUpload = null;
  }

  removeImage() {
    this.imageTemp = null;
    this.imageUpload = null;
  }

}
