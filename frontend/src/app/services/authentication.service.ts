import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl:string = "http://localhost:3000/api"

  constructor(private http: HttpClient) { }

  teacherLogin(credential:any):Observable<any>{
    return this.http.post(this.baseUrl+"/auth/teacher/login",credential);
  }

  studentLogin(credential:any):Observable<any>{
    return this.http.post(this.baseUrl+"/auth/student/login",credential);
  }

}
