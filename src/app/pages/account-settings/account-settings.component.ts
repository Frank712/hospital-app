import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {SettingsService} from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private _document,
               private _settService: SettingsService) { }

  ngOnInit() {
    this.loadCheck();
  }

  changeTheme( theme: string, link: any ) {
    this.applyCheck( link );
    this._settService.applyTheme(theme);
  }

  applyCheck( link: any ) {
    const selectors: any = document.getElementsByClassName('selector');
    for ( const ref of selectors ) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  loadCheck() {
    const theme = this._settService.settingsTheme.themeName;
    const selectors: any = document.getElementsByClassName('selector');
    for ( const ref of selectors ) {
      if ( theme === ref.getAttribute('data-theme') ){
        ref.classList.add('working');
        break;
      }
    }
  }

}
