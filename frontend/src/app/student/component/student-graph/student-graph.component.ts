import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-student-graph',
  templateUrl: './student-graph.component.html',
  styleUrls: ['./student-graph.component.scss']
})
export class StudentGraphComponent implements OnInit {
  title = 'ng2-charts-demo';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData!: ChartConfiguration<'bar'>['data']

 

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit(): void {
    this.makeRequest();
  }

  makeRequest() {
    const userInfo = localStorage.getItem('USER_DATA');
    if (userInfo) {
      const studentId = JSON.parse(userInfo).user._id;

      const today = new Date();
      const startDate = new Date(today); // Copy current date
      startDate.setDate(startDate.getDate() - 7); // Subtract seven days

      // Check if the start date is in the previous month
      if (startDate.getMonth() !== today.getMonth()) {
        // If so, set the start date to the 1st day of the current month
        startDate.setDate(1);
      }

      const endDate = new Date(); // End date is the current date


      this.attendanceService
        .getStudentDateRangeAttendance(studentId, startDate, endDate)
        .subscribe((response: any) => {
          if (response.success) {
            // Process response if needed
            this.barChartData = {
              labels: [],
              datasets: [
                { data: [], label: 'Present', borderColor: 'yellowgreen' },
                { data: [], label: 'Absent', borderColor: 'red' }
              ]
            };

            const data = response.data;
            const attendanceHashTable: { [date: string]: { present: number, absent: number } } = {};
            data.forEach((entry: any) => {
              const classDate = new Date(entry.classId.classDate).toLocaleDateString();
              if (!attendanceHashTable[classDate]) {
                attendanceHashTable[classDate] = { present: 0, absent: 0 };
              }
              entry.attendanceRecords.forEach((record: any) => {
                if (record.attendanceStatus === 'present') {
                  attendanceHashTable[classDate].present++;
                } else if (record.attendanceStatus === 'absent') {
                  attendanceHashTable[classDate].absent++;
                }
              });
            });

            // Update barChartData with data from attendanceHashTable
            this.barChartData.labels = Object.keys(attendanceHashTable);
            this.barChartData.datasets[0].data = Object.values(attendanceHashTable).map(entry => entry.present);
            this.barChartData.datasets[1].data = Object.values(attendanceHashTable).map(entry => entry.absent);
          }
        });
    }
  }
}
