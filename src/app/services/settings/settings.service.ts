import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settingsTheme: SettingThemeInt = {
    themeUrl: 'assets/css/colors/default-dark.css',
    themeName: 'default-dark'
  };

  constructor( @Inject(DOCUMENT) private _document ) {
    this.loadSettings();
  }

  saveSettings() {
    console.log('Saved in localStorage');
    localStorage.setItem('settings', JSON.stringify( this.settingsTheme));
  }

  loadSettings() {
    if ( localStorage.getItem('settings') ) {
      this.settingsTheme = JSON.parse(localStorage.getItem('settings'));
      this.applyTheme( this.settingsTheme.themeName );
    } else {
      this.applyTheme( this.settingsTheme.themeName );
    }
  }

  applyTheme( theme: string ) {
    const urlTheme = 'assets/css/colors/' + theme + '.css';
    this.settingsTheme.themeName = theme;
    this.settingsTheme.themeUrl = urlTheme;
    this._document.getElementById('theme').setAttribute('href', this.settingsTheme.themeUrl);
    this.saveSettings();

  }
}

interface SettingThemeInt {
  themeUrl: string;
  themeName: string;
}
