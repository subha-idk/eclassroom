import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  baseUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  createNotification(data:any):Observable<any>{
    return this.http.post(this.baseUrl+"/notification",data);
  }

  getNotifications(teacherId:string):Observable<any>{
    return this.http.get(this.baseUrl+"/notification/teacher/"+teacherId)
  }

  deleteNotification(id:string):Observable<any>{
    return this.http.delete(this.baseUrl+"/notification/"+id);
  }

  getNotificationBySection(section:string):Observable<any>{
    return this.http.get(this.baseUrl+"/notification/section/"+section)
  }


  
}
