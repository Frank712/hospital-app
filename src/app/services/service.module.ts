import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DoctorsService,
  HospitalService,
  LoginGuardGuard,
  SettingsService,
  SharedService,
  SidebarService,
  UploadFileService,
  UserService
} from './service.index';
import {HttpClientModule} from '@angular/common/http';
import {ModalUploadService} from '../components/modal-upload/modal-upload.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    LoginGuardGuard,
    UploadFileService,
    ModalUploadService,
    HospitalService,
    DoctorsService
  ]
})
export class ServiceModule { }
