import { Injectable } from '@angular/core';
import {HttpRequest} from '@angular/common/http';
import {URL_SERVICES} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile( file: File, _type: string, id: string ) {
    const formData = new FormData();
    const xhr = new XMLHttpRequest();
    return new Promise( (resolve, reject) => {
      formData.append( 'img', file, file.name );
      xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 200 ) {
            console.log('Image uploaded');
            resolve( JSON.parse( xhr.response ));
          } else {
            console.log('Upload failed');
            reject( JSON.parse( xhr.response ) );
          }
        }
      };
      let url = URL_SERVICES + '/upload/' + _type + '/' + id;
      xhr.open('PUT', url, true);
      xhr.send( formData );
    });
  }
}
