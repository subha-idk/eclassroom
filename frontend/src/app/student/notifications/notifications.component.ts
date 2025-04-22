import { Component } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  notification:{
    _id:string,
    message:string,
    createdAt:string,
    teacherId:{name:string,}
  }[]=[];
constructor(private notificationService:NotificationsService){

  this.makeRequest()
}

makeRequest(){
  let userInfo = localStorage.getItem("USER_DATA");
  if(userInfo){
    let section = JSON.parse(userInfo).user.section;
     this.notificationService.getNotificationBySection(section).subscribe((response:any)=>{
      this.notification = response.data.reverse()
     })
  }
}
}
