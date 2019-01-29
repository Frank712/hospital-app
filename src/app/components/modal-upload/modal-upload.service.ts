import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  public _type: string;
  public _id: string;
  public hidden: string = 'hidden';

  public notification = new EventEmitter<any>();

  constructor() { }

  hiddenModal() {
    this.hidden = 'hidden';
    this._id = null;
    this._type = null;
  }

  showModal( _type: string, id: string ) {
    this.hidden = '';
    console.log(_type, id);
    this._id = id;
    this._type = _type;
  }
}
