import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from 'src/app/services/attendance.service';

interface SubjectAttendance {
  classDate:string;
  totalClasses: number;
  presentClasses: number;
  absentClasses: number;
}

@Component({
  selector: 'app-attendance-in-range',
  templateUrl: './attendance-in-range.component.html',
  styleUrls: ['./attendance-in-range.component.scss'],
})
export class AttendanceInRangeComponent {
  attendanceList!: any;
  formGroup!: FormGroup;
  newAttendanceList: { [key: string]: SubjectAttendance } = {}; 

  startDate!: Date;
  endDate!: Date;
Object: any;

  constructor(
    private attendanceService: AttendanceService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group(
      {
        startDate: [null, Validators.required],
        endDate: [null, Validators.required],
      },
      { validators: this.dateRangeValidator }
    );
  }


  get AttendanceListKeys() {
    return Object.keys(this.newAttendanceList);
  }

  submit() {

    const startdate = new Date(this.startDate);
    const enddate = new Date(this.endDate);

    let start = `${startdate.getDate()}-${
      startdate.getMonth() + 1
    }-${startdate.getFullYear()}`;
    let end = `${enddate.getDate()}-${
      enddate.getMonth() + 1
    }-${enddate.getFullYear()}`;

    this.makeRequest(start, end);
  }

  dateRangeValidator(formGroup: FormGroup) {
    const startDate = formGroup.get('startDate')?.value;
    const endDate = formGroup.get('endDate')?.value;

    if (startDate && endDate) {
      if (startDate > endDate) {
        return { dateRangeInvalid: true };
      }

      if (endDate > new Date()) {
        formGroup.get('endDate')?.setErrors({ futureDate: true });
        return { dateRangeInvalid: true };
      }
    }

    return null;
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
            this.attendanceList = response.data;
            this.processAttendanceData()
          }
        });
    }
  }

  get totalClasses() {
    if (this.attendanceList) {
      return this.attendanceList.length;
    }

    return 0;
  }

  get present() {
    if (this.attendanceList) {
      return this.attendanceList.filter(
        (value: any) =>
          value.attendanceRecords[0].attendanceStatus === 'present'
      ).length;
    }

    return 0;
  }

  processAttendanceData() {
    const subjectAttendance: { [key: string]: SubjectAttendance } = {};

    // Iterate over the attendance list and aggregate data for each subject
    this.attendanceList.forEach((attendance: any) => {
      const subjectName: string = attendance.classId.className;
      if (!subjectAttendance[subjectName]) {
        subjectAttendance[subjectName] = {
          classDate:"",
          totalClasses: 0,
          presentClasses: 0,
          absentClasses: 0,
        };
      }
      subjectAttendance[subjectName].totalClasses++;
      subjectAttendance[subjectName].classDate = attendance.classId.classDate
      if (attendance.attendanceRecords[0].attendanceStatus === 'present') {
        subjectAttendance[subjectName].presentClasses++;
      } else {
        subjectAttendance[subjectName].absentClasses++;
      }
    });

    this.newAttendanceList = subjectAttendance;
  }
}
