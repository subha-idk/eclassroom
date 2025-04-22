import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Class {
  _id?:string;
  className: string;
  section: string;
  classDate: Date;
}

@Injectable({
  providedIn: 'root',
})
class ClassesService {
  // Create an array of objects with 5 entries
  

  baseUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  addClass(classDetails: any): Observable<any> {
    return this.http.post(this.baseUrl + '/class/create-class', classDetails);
  }

  deleteClass(classID: string): Observable<any> {
    return this.http.delete(this.baseUrl + '/class/' + classID);
  }

  getClassesByTeacher(teacherId: string): Observable<any> {
    return this.http.get(this.baseUrl + '/class/teacher/' + teacherId);
  }

  
}

export { ClassesService, Class };
