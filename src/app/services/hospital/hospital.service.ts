import { Injectable } from '@angular/core';
import {HospitalModel} from '../../models/hospital.model';
import {URL_SERVICES} from '../../config/config';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {UploadFileService} from '../../services/uploadFile/upload-file.service';
import { UserService } from '../../services/user/user.service';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor( public http: HttpClient,
               public _userService: UserService,
               public _ufService: UploadFileService) {
    this._userService.loadStorage();
  }

  loadHospitals( ) {
    const url = URL_SERVICES + '/hospital';
    return this.http.get(url);
  }

  getHospital( id: string ) {
    const url = URL_SERVICES + '/hospital/' + id;
    return this.http.get(url);
  }

  searchHospitals( term: string ) {
    const url = URL_SERVICES + '/search/collection/hospitals/' + term;
    return this.http.get(url);
  }

  deleteHospital( id: string ) {
    const url = URL_SERVICES + '/hospital/' + id + '?token=' + this._userService.token;
    return this.http.delete(url);
  }

  createHospital( name: string ) {
    let url = URL_SERVICES + '/hospital';
    url += '?token=' + this._userService.token;
    return this.http.post( url, { name })
      .pipe( map((resp: any) => {
        Swal.fire('Hospital created', `Hospital '${name} created successfully!`, 'success');
        return resp.hospital;
      }));
  }

  updateHospital( hospital: HospitalModel ) {
    let url = URL_SERVICES + '/hospital/' + hospital._id;
    url += '?token=' + this._userService.token;
    return this.http.put(url, hospital).pipe( map( (resp: any) => {
      if ( resp.ok ) {
        Swal.fire( 'Hospital updated', `The hospital '${hospital.name}' has been updated successfully`, 'success' );
        return true;
      }
    }));
  }
}
