import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

interface AttendanceList {
  _id: string;
  roll: string;
  name: string;
  isPresent: boolean;
}

@Injectable({
  providedIn: 'root',
})
class AttendanceService implements OnInit {
  // Create an array with 50 entries
  studentList: AttendanceList[] = [];

  baseUrl: string = 'http://localhost:3000/api';

  ngOnInit() {}

  constructor(private http: HttpClient) {}

  markAttendance(attendanceRecords: any, classId: string): Observable<any> {
    return this.http.post(this.baseUrl + '/attendance/create-attendance', {
      classId,
      attendanceRecords,
    });
  }

  getParticularClassAttendence(classId: string): Observable<any> {
    return this.http.get(this.baseUrl + '/attendance/class/' + classId);
  }

  updateAttendence(attendanceId: string, data: any): Observable<any> {
    return this.http.put(this.baseUrl + '/attendance/' + attendanceId, data);
  }

  getParticularDateAttendence(teacherId: string, date: Date): Observable<any> {
    const formettedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
     

    return this.http.get(
      this.baseUrl +
        '/attendance/teacher/' +
        teacherId +
        '/date/' +
        formettedDate
    );
  }

  getStudentDateRangeAttendance(
    studentId: string,
    startDate: Date,
    endDate: Date
  ): Observable<any> {
    const formettedStartDate = `${startDate.getFullYear()}-${
      startDate.getMonth() + 1
    }-${startDate.getDate()}`;
    const formettedEndDate = `${endDate.getFullYear()}-${
      endDate.getMonth() + 1
    }-${endDate.getDate()}`;


    return this.http.get(
      this.baseUrl +
        '/attendance/student/' +
        studentId +
        '/start/' +
        formettedStartDate +
        '/end/' +
        formettedEndDate
    );
  }
}

export { AttendanceService, AttendanceList };
