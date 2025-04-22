import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Section {
  value: string;
  viewValue: string;
}

interface Subject {
  value: string;
  viewValue: string;
}

@Injectable({
  providedIn: 'root',
})
class ConstantsService {
  sections: Section[] = []; // Initialize as an empty array

  subjectList: Subject[] = [];

  baseUrl = 'http://localhost:3000/api';
  adminPassword: string = 'admin123123';

  constructor(private http: HttpClient) {}

  addSections(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/section', data);
  }

  getSections(): Observable<any> {
    return this.http.get(this.baseUrl + '/section');
  }

  deleteSection(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + '/section/' + id);
  }

  addSubjects(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/subject', data);
  }

  getSubjects(): Observable<any> {
    return this.http.get(this.baseUrl + '/subject');
  }

  deleteSubject(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + '/subject/' + id);
  }
}

export { ConstantsService, Section, Subject };
