import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert';
import {UserService} from '../services/service.index';
import {UserModel} from '../models/user.model';
import {Router} from '@angular/router';
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './login.component.css' ]
})
export class RegisterComponent implements OnInit {

  _formGroup: FormGroup;

  constructor( public userService: UserService,
               public router: Router) { }

  errorEqualsValues (field_1: string, field_2: string) {

    return (group: FormGroup) => {
      const f1 = group.controls[field_1].value;
      const f2 = group.controls[field_2].value;
      if ( f1 === f2 ) {
        return null;
      }
      return {
        arentEquals: true
      };
    };
  }

  ngOnInit() {
    init_plugins();
    this._formGroup = new FormGroup({
      name: new FormControl( null, Validators.required),
      lastname: new FormControl( null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password1: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      conditions: new FormControl(false)
    }, { validators: this.errorEqualsValues( 'password1', 'password2' ) });

    this._formGroup.setValue({
      name: 'Test ',
      lastname: 'LastTest ',
      email: 'test_@mail.com',
      password1: '123456',
      password2: '123456',
      conditions: true
    });
  }



  registerUser() {
    if (this._formGroup.invalid) {
      return;
    }
    if ( !this._formGroup.value.conditions ) {
      swal( 'Important', 'Must be accept conditions', 'warning' );
      console.log('Must be accept conditions');
      return;
    }
    console.log(this._formGroup.value);
    const user = new UserModel(
      this._formGroup.value.name,
      this._formGroup.value.lastname,
      this._formGroup.value.email,
      this._formGroup.value.password1
    );
    console.log('The user in RegisterComponent is: ', user);
    this.userService.createUser( user )
      .subscribe( resp => {
        console.log(resp);
        this.router.navigate(['/login']);
      } );
  }
}
