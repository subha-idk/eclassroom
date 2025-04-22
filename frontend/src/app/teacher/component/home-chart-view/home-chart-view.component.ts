import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-home-chart-view',
  templateUrl: './home-chart-view.component.html',
  styleUrls: ['./home-chart-view.component.scss'],
})
export class HomeChartViewComponent {
  attendenceRecords: any = [];

  public lineChartData!: ChartConfiguration<'line'>['data'];
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public lineChartLegend = true;

  constructor() {}

  setChartData() {
    this.lineChartData = {
      labels: [],
      datasets: [
        { data: [], label: '', borderColor: 'yellowgreen' },
        { data: [], label: '', borderColor: 'red' },
      ],
    };

    try {
      this.attendenceRecords.forEach((classes: any) => {
        this.lineChartData.labels?.push(classes.classId.section);

        this.lineChartData.datasets[0].data.push(
          classes.attendanceRecords.filter(
            (attendence: any) => attendence.attendanceStatus === 'present'
          ).length
        );
        this.lineChartData.datasets[0].label = 'Present';
        this.lineChartData.datasets[1].data.push(
          classes.attendanceRecords.filter(
            (attendence: any) => attendence.attendanceStatus === 'absent'
          ).length
        );
        this.lineChartData.datasets[1].label = 'Absent';
      });
    } catch (error) {}
  }
}
