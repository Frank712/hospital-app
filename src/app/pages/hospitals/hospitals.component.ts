import { Component, OnInit } from '@angular/core';
import {HospitalService} from '../../services/hospital/hospital.service';
import {HospitalModel} from '../../models/hospital.model';
import {ModalUploadService} from '../../components/modal-upload/modal-upload.service';
declare var swal: any;
@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: []
})
export class HospitalsComponent implements OnInit {
  hospitals: HospitalModel[] = [];
  loadingHospitals: boolean;
  registerTotal = 0;

  constructor( public _hospitalService: HospitalService,
               public _modUpServices: ModalUploadService ) { }

  ngOnInit() {
    this.loadHospitals();
    this._modUpServices.notification.subscribe( resp => this.loadHospitals());
  }

  loadHospitals() {
    this.loadingHospitals = true;
    this._hospitalService.loadHospitals().subscribe( (resp: any) => {
      this.hospitals = resp.hospitals;
      this.registerTotal = resp.counter;
    });
    this.loadingHospitals = false;
  }

  searchHospitals( term: string ) {
    if ( term.length <= 0 ) {
      this.loadHospitals();
      return;
    }
    this.loadingHospitals = true;
    this._hospitalService.searchHospitals( term ).subscribe( (resp: any) => {
      this.hospitals = resp.hospitals;
      this.registerTotal = resp.hospitals.length;
    });
    this.loadingHospitals = false;
  }

  showFormCreate( ) {
    swal({
      title: 'Create Hospital',
      text: 'Enter the Hospital name:',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (value: string) => {
      if ( !value || value.length === 0 ) {
        return;
      }
      this.createHospital(value);
    });
  }

  createHospital( name: string ) {
    console.log('Hospital recived: ', name);
    this._hospitalService.createHospital( name ).subscribe( (resp: any) => {
      this.loadHospitals();
    });
  }

  saveHospital( hospital: HospitalModel ) {
    this._hospitalService.updateHospital( hospital ).subscribe( (resp: any) => {
      console.log('All right');
    });
  }

  deleteHospital( hospital: HospitalModel ) {
    console.log('deleteHospital...');
    swal( {
      title: 'Are you sure?',
      text: `You are about to delete the hospital '${hospital.name}'`,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
      .then( willDelete => {
        if ( willDelete ) {
          this._hospitalService.deleteHospital(hospital._id).subscribe( (resp: any) => {
            console.log(resp);
            if ( resp.ok ) {
              swal( 'Hospital deleted', 'The hospital ' + hospital.name + ' has been deleted successfully', 'success' );
              this.loadHospitals();
            } else {
              swal( 'Error delete', 'The hospital could\'t deleted', 'error' );
            }
          });
        }
      });
  }

  showModalImage( id: string ) {
    this._modUpServices.showModal( 'hospitals', id );
  }

}
