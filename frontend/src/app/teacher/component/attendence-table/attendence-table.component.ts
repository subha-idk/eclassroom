import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  AttendanceService,
  AttendanceList,
} from 'src/app/services/attendance.service';

interface AttendanceRecord {
  studentId: string;
  attendanceStatus: string;
}

@Component({
  selector: 'app-attendence-table',
  templateUrl: './attendence-table.component.html',
  styleUrls: ['./attendence-table.component.scss'],
})
export class AttendenceTableComponent {
  studentList: AttendanceList[] = [];
  allChecked: boolean = false;

  attendanceRecords: AttendanceRecord[] = [];

  constructor(private attendanceService: AttendanceService) {
    this.studentList = attendanceService.studentList;
    // console.log(this.studentList)
  }

  updateStudentList(newList: AttendanceList[]): void {
    this.studentList = newList;
  }

  onAllSelectClicked() {
    if (!this.allChecked) {
      this.studentList.map((value: AttendanceList) => (value.isPresent = true));
    } else {
      this.studentList.map(
        (value: AttendanceList) => (value.isPresent = false)
      );
    }
    this.allChecked = !this.allChecked;
  }
  onCheckBoxClicked(student: AttendanceList) {
    student.isPresent = !student.isPresent;
  }

  submit() {
    return this.studentList;
    // console.log(this.studentList);
  }

  getAttendanceRecords() {
    this.attendanceRecords = []
    // Ensure studentList is not empty before iterating
    if (this.studentList && this.studentList.length > 0) {
      this.studentList.forEach((student) => {
        const studentId = student._id;
        const attendanceStatus = student.isPresent ? 'present' : 'absent';
  
        this.attendanceRecords.push({ studentId, attendanceStatus });
      });
  
    } else {
      console.log('Student list is empty.'); // Log an error message if studentList is empty
    }
  
    return this.attendanceRecords;
  }
}
