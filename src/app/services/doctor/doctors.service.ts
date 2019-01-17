import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICES} from '../../config/config';
import {UserService} from '../user/user.service';
import {DoctorModel} from '../../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor( public http: HttpClient,
               public _userService: UserService) { }

  getAllDoctors( ) {
    const url = URL_SERVICES + '/doctor';
    return this.http.get(url);
  }

  searchDoctor( term: string ) {
    const url = URL_SERVICES + '/search/collection/doctors/' + term;
    return this.http.get(url);
  }

  deleteDoctor( id: string ) {
    let url = URL_SERVICES + '/doctor/' + id;
    url += '?token=' + this._userService.token;
    return this.http.delete(url);
  }

  saveDoctor( doctor: DoctorModel ) {
    let url = URL_SERVICES + '/doctor';

    if ( doctor._id ) {
      url += '/' + doctor._id + '?token=' + this._userService.token;
      return this.http.put(url, doctor);

    } else {
      url += '?token=' + this._userService.token;
      return this.http.post(url, doctor);
    }

  }

  getDoctor( id: string ) {
    const url = URL_SERVICES + '/doctor/' + id ;
    return this.http.get(url);
  }
}
