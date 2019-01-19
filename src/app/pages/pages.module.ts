//  Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {PipesModule} from '../pipes/pipes.module';

// Components
import {PagesComponent} from './pages.component';

import { ChartsModule } from 'ng2-charts';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {Graphics1Component} from './graphics1/graphics1.component';
import {FormsModule} from '@angular/forms';
import {IncrementerComponent} from '../components/incrementer/incrementer.component';
import {DoughnutChartComponent} from '../components/doughnut-chart/doughnut-chart.component';
import { PromisesComponent } from './promises/promises.component';

//  Routes
import {PAGES_ROUTES} from './pages.routes';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import {CommonModule} from '@angular/common';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graphics1Component,
    /*PagesComponent,*/
    IncrementerComponent,
    DoughnutChartComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    ViewProfileComponent,
    UsersComponent,
    /*ModalUploadComponent,*/
    HospitalsComponent,
    DoctorsComponent,
    DoctorComponent,
    SearchComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graphics1Component
  ],
  imports: [
    /*BrowserModule,*/
    CommonModule,
    SharedModule,
    FormsModule,
    ChartsModule,
    PipesModule,
    PAGES_ROUTES
  ]
})

export class PagesModule {}
