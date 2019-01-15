import { Pipe, PipeTransform } from '@angular/core';
import {URL_SERVICES} from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  transform(img: string, _type: string = 'user'): any {
    let url = URL_SERVICES + '/images';
    if ( !img ) {
      return url + '/users/unknow';
    }
    if ( img.indexOf('https') >= 0 ) {
      return img;
    }
    switch (_type) {
      case 'user':
        url += '/users/' + img;
        break;
      case 'doctor':
        url += '/doctors/' + img;
        break;
      case 'hospital':
        url += '/hospitals/' + img;
        break;
    }
    return url;
  }
}
