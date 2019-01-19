//  Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {PagesModule} from './pages/pages.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//  Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

//  Routes
import {APP_ROUTES} from './app.routes';

// Services
import {ServiceModule} from './services/service.module';
import {PagesComponent} from './pages/pages.component';
import {SharedModule} from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    /*PagesModule,*/
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
