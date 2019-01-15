import { Routes, RouterModule } from '@angular/router';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {Graphics1Component} from './graphics1/graphics1.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {PromisesComponent} from './promises/promises.component';
import {RxjsComponent} from './rxjs/rxjs.component';
import {LoginGuardGuard} from '../services/service.index';
import {ProfileComponent} from './profile/profile.component';


const pagesRoutes: Routes = [
  { path: '',
    component: PagesComponent,
    canActivate: [ LoginGuardGuard ],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard', description: 'This is a Dashboard page'} },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress', description: 'This is a Progress page'} },
      { path: 'graphics1', component: Graphics1Component, data: { title: 'Graphics', description: 'This is a Graphics page'} },
      { path: 'accountSettings', component: AccountSettingsComponent, data: { title: 'Account Settings', description: 'This is a AccountSettings page'} },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promises', description: 'This is a Promises page'} },
      { path: 'profile', component: ProfileComponent, data: { title: 'User profile', description: 'Show the user profile'} },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'rxjs', description: 'This is a rxj page'} },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
