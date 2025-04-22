import { Component } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-today-attendance',
  templateUrl: './today-attendance.component.html',
  styleUrls: ['./today-attendance.component.scss'],
})
export class TodayAttendanceComponent {
  attendenceList!: any;

  constructor(private attendanceService: AttendanceService) {
    const date = new Date();
    let serchDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    this.makeRequest(serchDate, serchDate);
  }

  makeRequest(start: string, end: string) {
    const userInfo = localStorage.getItem('USER_DATA');
    if (userInfo) {
      let studentId = JSON.parse(userInfo).user._id;

      const startDateParts = start.split('-').reverse().join('-');
      const endDateParts = end.split('-').reverse().join('-');
      const startDate = new Date(startDateParts);
      const endDate = new Date(endDateParts);

      this.attendanceService
        .getStudentDateRangeAttendance(studentId, startDate, endDate)
        .subscribe((response) => {
          if (response.success) {
            this.attendenceList = response.data;
          }
        });
    }
  }

  get totalClasses() {
    if (this.attendenceList) {
      return this.attendenceList.length;
    }

    return 0;
  }

  get present() {
    if (this.attendenceList) {
      return this.attendenceList.filter(
        (value: any) =>
          value.attendanceRecords[0].attendanceStatus === 'present'
      ).length;
    }

    return 0;
  }
}
