import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphics1',
  templateUrl: './graphics1.component.html',
  styles: []
})
export class Graphics1Component implements OnInit {
  graphics: any[];
  data1: number[] = [];
  data2: number[] = [];
  data3: number[] = [];
  data4: number[] = [];

  constructor() { }

  ngOnInit() {
    this.setDatas();
    this.graphics = [
      {
        'labels': ['Soccer', 'Tennis', 'Football'],
        'data':  this.data1,
        'type': 'doughnut',
        'item': 'The best sport is...'
      },
      {
        'labels': ['Male', 'Female'],
        'data':  this.data2,
        'type': 'doughnut',
        'item': 'Interviews'
      },
      {
        'labels': ['Yes', 'No'],
        'data':  this.data3,
        'type': 'doughnut',
        'item': 'Dou you practice sports?'
      },
      {
        'labels': ['No', 'Si'],
        'data':  this.data4,
        'type': 'doughnut',
        'item': 'Would you like to play in a team sport?' +
          ''
      }
    ];
  }

  setDatas() {
    let num1 = Math.floor(Math.random() * (100 - 1)) + 1;
    let num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
    let num3 = 100 - num1 - num2;
    this.data1.push(num1, num2, num3);
    num1 = Math.floor(Math.random() * (100 - 1)) + 1;
    num2 = 100 - num1;
    this.data2.push(num1, num2);
    num1 = Math.floor(Math.random() * (100 - 1)) + 1;
    num2 = 100 - num1;
    this.data3.push(num1, num2);
    num1 = Math.floor(Math.random() * (100 - 1)) + 1;
    num2 = 100 - num1;
    this.data4.push(num1, num2);

  }

}
