import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscriber, Subscription} from 'rxjs';
import {map, retry, filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})

export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  public time = 0;
  public message = '';

  constructor() {
    this.subscription = this.returnObservable()
      .pipe(
        retry(3)
      )
      .subscribe(
      num => this.time = num,
      error => this.message = error,
      () => this.message = 'The observer has been finished!'
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('The page will close');
    this.subscription.unsubscribe();
  }

  returnObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let counter = 0;
      const interval = setInterval( () => {
        counter += 1;
        const output = {
          value: counter
        };
        observer.next( output );
        /*if ( counter === 20 ) {
          clearInterval( interval );
          observer.complete();
        }*/
        /*if ( counter === 30000 ) {
          observer.error('The obs has failed');
        }*/
      }, 1000);
    }).pipe(
      map( resp => {
        /*return ((resp.value) < 10 ? '00:0' : '00:') + resp.value;*/
        return resp.value;
      }),
      filter( (value, index) => value % 2 === 0)
    );
  }

}
