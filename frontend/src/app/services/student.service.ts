import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  baseUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  addStudent(student: any): Observable<any> {
    return this.http.post(this.baseUrl + '/student/add-student', student);
  }

  getStudentBySection(section: string): Observable<any> {
    return this.http.get(this.baseUrl + `/student/section/?section=${section}`);
  }

  updateStudent(student: any, studentId: string): Observable<any> {
    return this.http.put(this.baseUrl + '/student/' + studentId, student);
  }

  getStudents():Observable<any>{
    return this.http.get(this.baseUrl+"/student")
   }

   deleteStudent(studentId:string):Observable<any>{
     return this.http.delete(this.baseUrl+"/student/"+studentId)
   }
   deleteAllStudent():Observable<any>{
     return this.http.delete(this.baseUrl+"/student/all")
   }
}
