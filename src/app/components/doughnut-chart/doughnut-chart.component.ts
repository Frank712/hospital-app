import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styles: []
})
export class DoughnutChartComponent implements OnInit {
  @Input() doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() doughnutChartData: number[] = [350, 450, 100];
  @Input() doughnutChartType: string = 'doughnut';
  @Input() doughnutItem: string = 'item';

  constructor() { }

  ngOnInit() { }

}
