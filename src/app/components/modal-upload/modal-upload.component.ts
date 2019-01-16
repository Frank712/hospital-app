import { Component, OnInit } from '@angular/core';
import {UploadFileService} from '../../services/service.index';
import {ModalUploadService} from './modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imageUpload: File;
  imageTemp: string;

  constructor( public _uploadFilesServices: UploadFileService,
               public _modalUpService: ModalUploadService) {
    console.log('Modal Ready!');
  }

  imageSelected( file: File ) {
    if ( !file ) {
      this.imageUpload = null;
      return;
    }

    if ( file.type.indexOf('image') < 0 ) {
      swal('Only images', 'The selected file is not a image', 'error');
      this.imageUpload = null;
      return;
    }
    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL(file);
    reader.onloadend = () => this.imageTemp = reader.result.toString();

    this.imageUpload = file;
  }

  ngOnInit() {
  }

  closeModal() {
    this.imageTemp = null;
    this.imageUpload = null;
    this._modalUpService.hiddenModal();
  }

  removeTempImage() {
    this.imageTemp = null;
  }

  uploadImage () {
    this._uploadFilesServices.uploadFile( this.imageUpload, this._modalUpService._type, this._modalUpService._id  )
      .then( (resp) => {
        console.log(resp);
        this._modalUpService.notification.emit( resp );
        this.closeModal();
      })
      .catch( (resp) => {
        console.log('Error try upload image');
      });
  }

}
