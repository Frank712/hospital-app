import { Component, OnInit } from '@angular/core';
import {DoctorsService} from '../../services/service.index';
import { swal } from 'sweetalert';
import {DoctorModel} from '../../models/doctor.model';
declare var swal: any;
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {
  doctors: DoctorModel[] = [];
  totalRegister = 0;
  totalSearch = 0;
  plural = false;
  searching = false;
  constructor( public _doctorService: DoctorsService ) {  }

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.searching = false;
    this._doctorService.getAllDoctors().subscribe( (resp: any) => {
      this.doctors = resp.doctors;
      this.totalRegister = resp.counter;
      console.log(resp.message);
    });
  }

  searchDoctors( term: string ) {
    this.searching = true;
    if ( term.length <= 0 ) {
      this.loadDoctors();
      return;
    }
    this._doctorService.searchDoctor( term ).subscribe( (resp: any) => {
      if ( resp.ok ) {
        this.doctors = resp.doctors;
        this.totalSearch = resp.doctors.length;
        this.plural = !(this.totalSearch === 1);
      } else {
        this.doctors = null;
        this.totalSearch = 0;
        this.plural = true;
      }
    });
  }

  deleteDoctor( doctor: DoctorModel) {
    swal({
      title: 'Are you sure?',
      text: 'You are about to delete the user ' + doctor.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
      .then( willDelete => {
        if ( willDelete ) {
          this._doctorService.deleteDoctor(doctor._id).subscribe( (resp: any) => {
            console.log(resp);
            if ( resp.ok ) {
              swal( 'User deleted', 'The doctor ' + doctor.name + ' has been deleted successfully', 'success' );
              this.loadDoctors();
            } else {
              swal( 'Error delete', 'The doctor could\'t deleted', 'error' );
            }
          });
        }
      });
  }

}
