import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HospitalModel} from '../../models/hospital.model';
import {DoctorsService, HospitalService} from '../../services/service.index';
import {DoctorModel} from '../../models/doctor.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalUploadService} from '../../components/modal-upload/modal-upload.service';
declare var swal: any;
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {
  hospitals: HospitalModel[] = [];
  doctor: DoctorModel = new DoctorModel('', '', '', '', '');
  hospital: HospitalModel = new HospitalModel('');

  constructor( public _hospitalService: HospitalService,
               public _doctorService: DoctorsService,
               public router: Router,
               public activatedRoute: ActivatedRoute,
               public _muService: ModalUploadService) {
    this.activatedRoute.params.subscribe( (params) => {
      const id = params['id'];
      if ( id !== 'new' ) {
        this.loadDoctor( id );
      }
    });
  }

  ngOnInit() {
    this._hospitalService.loadHospitals().subscribe( (resp: any) => {
      this.hospitals = resp.hospitals;
    });
    this._muService.notification.subscribe( (resp: any) => {
      this.doctor.img = resp.doctor.img;
    });
  }
  saveDoctor( form: NgForm ) {
    console.log(form.valid);
    console.log(form.value);
    if ( !form.valid ) return;
    this._doctorService.saveDoctor( this.doctor ).subscribe( (resp: any) => {
      swal( 'Ok!', resp.message, 'success' );
      this.doctor._id = resp.doctor._id;
      this.router.navigate(['/doctor', this.doctor._id]);
    });
  }

  changeHospital( id: string) {
    console.log( id );
    this._hospitalService.getHospital( id ).subscribe( (resp: any) => {
      this.hospital = resp.hospital;
    });
  }

  loadDoctor( id: string) {
    this._doctorService.getDoctor( id ).subscribe( (resp: any) => {
      this.doctor = resp.doctor;
      this.doctor.hospital = resp.doctor.hospital._id;
      this.changeHospital( this.doctor.hospital );
    });
  }

  changeImage( ) {
    this._muService.showModal( 'doctors', this.doctor._id );
  }

}
