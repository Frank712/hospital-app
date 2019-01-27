import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AdminGuard,
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
import {VerifyTokenGuard} from './guards/verify-token.guard';

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
    DoctorsService,
    AdminGuard,
    VerifyTokenGuard
  ]
})
export class ServiceModule { }
