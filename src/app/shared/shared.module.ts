//  Modules
import { NgModule } from '@angular/core';
import {PipesModule} from '../pipes/pipes.module';

//  Components
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {NopagefoundComponent} from './nopagefound/nopagefound.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    PipesModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    NopagefoundComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    NopagefoundComponent
  ]
})
export class SharedModule { }
