import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: []
})
export class IncrementerComponent implements OnInit {
  @ViewChild( 'txtPercent' ) txtPercent: ElementRef;
  @Input() identifier: string = 'Identifier';
  @Input() percent: number = 50;
  @Output()  changeValueEmitter: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  changeValue( value: number ) {
    if ( this.percent >= 100 && value > 0  ) {
      this.percent = 100;
      return;
    }
    if (this.percent <= 0 && value < 0 ) {
      this.percent = 0;
      return;
    }
    this.percent += value;
    this.changeValueEmitter.emit( this.percent );
    this.txtPercent.nativeElement.focus();
  }

  onChanges( newValue: number ) {
    if ( newValue >= 100 ) {
      this.percent = 100;
    } else if ( newValue <= 0 ) {
      this.percent = 0;
    } else {
      this.percent = newValue;
    }
    this.txtPercent.nativeElement.value = this.percent;
    this.changeValueEmitter.emit( newValue );
  }
}
