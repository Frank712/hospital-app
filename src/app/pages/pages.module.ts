//  Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
// Components
import {PagesComponent} from './pages.component';

import { ChartsModule } from 'ng2-charts';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {Graphics1Component} from './graphics1/graphics1.component';
import {FormsModule} from '@angular/forms';
import {IncrementerComponent} from '../components/incrementer/incrementer.component';
import {DoughnutChartComponent} from '../components/doughnut-chart/doughnut-chart.component';

//  Routes
import {PAGES_ROUTES} from './pages.routes';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graphics1Component,
    PagesComponent,
    IncrementerComponent,
    DoughnutChartComponent,
    AccountSettingsComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graphics1Component,
    PagesComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    ChartsModule,
    PAGES_ROUTES
  ]
})

export class PagesModule {}
