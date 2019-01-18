import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICES} from '../../config/config';
import {UserModel} from '../../models/user.model';
import {DoctorModel} from '../../models/doctor.model';
import {HospitalModel} from '../../models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  users: UserModel [] = [];
  doctors: DoctorModel [] = [];
  hospitals: HospitalModel [] = [];
  constructor( public activaredRoute: ActivatedRoute,
               public http: HttpClient ) {
    this.activaredRoute.params.subscribe( params => {
      const term = params['term'];
      this.search( term );
    });
  }

  ngOnInit() {
  }

  search( term: string ) {
    const url = URL_SERVICES + '/search/all/' + term;
    this.http.get( url ).subscribe( (resp: any) => {
      console.log(resp);
      this.users = resp.users;
      this.doctors = resp.doctors;
      this.hospitals = resp.hospitals;

    });
  }

}
