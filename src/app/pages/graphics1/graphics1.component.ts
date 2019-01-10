import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphics1',
  templateUrl: './graphics1.component.html',
  styles: []
})
export class Graphics1Component implements OnInit {
  graphics: any[] = [
    {
      'labels': ['Soccer', 'Tennis', 'Football'],
      'data':  [24, 30, 46],
      'type': 'doughnut',
      'item': 'The best sport is...'
    },
    {
      'labels': ['Male', 'Female'],
      'data':  [4500, 6000],
      'type': 'doughnut',
      'item': 'Interviews'
    },
    {
      'labels': ['Yes', 'No'],
      'data':  [95, 5],
      'type': 'doughnut',
      'item': 'Dou you practice sports?'
    },
    {
      'labels': ['No', 'Si'],
      'data':  [85, 15],
      'type': 'doughnut',
      'item': 'Would you like to play in a team sport?' +
        ''
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
