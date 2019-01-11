import { Component, OnInit } from '@angular/core';
import {interval} from 'rxjs';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  public counter = 0;

  constructor() {
    console.log('Starting...');
    this.countThree().then(
      () => console.log('Finished success!')
    ).catch(
      error => console.error('Failed!!!', error));
  }

  countThree(): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      const _interval = setInterval(() => {
        this.counter += 1;
        if ( this.counter === 100 ) {
          resolve( true );
        } else if ( this.counter === 101 ) {
          reject( false );
          clearInterval(_interval);
        }
      }, 100);
    });
  }

  ngOnInit() {
  }

}
