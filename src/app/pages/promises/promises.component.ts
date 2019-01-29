import { Component, OnInit } from '@angular/core';
import {interval} from 'rxjs';
import Swal from "sweetalert2";

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  public counter = 0;
  public message: string;
  public numberProcess: number = 0;

  constructor() {
    console.log('Starting...');
    this.message = 'Starting...';
    this.countThree().then(
      () => this.message = 'Finished...'
    ).catch(
      error => console.error('Failed!!!', error));
  }

  countThree(): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      const _interval = setInterval(() => {
        this.counter += 1;
        if ( this.counter === 99 ) {
          this.numberProcess += 1;
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: `The process #${this.numberProcess} has ended`,
            showConfirmButton: true,
            timer: 1200
          });
          resolve( true );
        } else if ( this.counter === 100 ) {
          reject( false );
          clearInterval(_interval);
        }
      }, 50);
    });
  }

  ngOnInit() {

  }

}
