import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  baseUrl:string = "http://localhost:3000/api"

  constructor(private http: HttpClient) { }

   addTeacher(teacher:any):Observable<any>{
    return this.http.post(this.baseUrl+"/teacher/add-teacher",teacher)
   }

   updateTeacher(teacher:any,teacherId:string):Observable<any>{
    return this.http.put(this.baseUrl+"/teacher/"+teacherId,teacher)
   }

   getTeachers():Observable<any>{
    return this.http.get(this.baseUrl+"/teacher")
   }

   deleteTeacher(techerId:string):Observable<any>{
     return this.http.delete(this.baseUrl+"/teacher/"+techerId)
   }
   deleteAllTeacher():Observable<any>{
    return this.http.delete(this.baseUrl+"/teacher/all")
  }

  
}
