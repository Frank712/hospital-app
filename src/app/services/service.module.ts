import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginGuardGuard, SettingsService, SharedService, SidebarService, UploadFileService, UserService} from './service.index';
import {HttpClientModule} from '@angular/common/http';

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
    UploadFileService
  ]
})
export class ServiceModule { }
