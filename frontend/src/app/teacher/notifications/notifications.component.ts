import { Component } from '@angular/core';
import { AddNotificationComponent } from '../component/add-notification/add-notification.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  notification: {
    _id: string;
    section: string;
    message: string;
    createdAt: string;
  }[] = [];

  modalRef: MdbModalRef<AddNotificationComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private notificationService: NotificationsService,
    private toastr: ToastrService
  ) {
    this.makeRequest();
  }

  openModal() {
    this.modalRef = this.modalService.open(AddNotificationComponent);
    this.modalRef.onClose.subscribe((canUpdate: any) => {
      if(canUpdate){
        this.makeRequest()
      }
    });
  }

  makeRequest() {
    let userInfo = localStorage.getItem('USER_DATA');

    if (userInfo) {
      let teacherId = JSON.parse(userInfo).user._id;

      this.notificationService
        .getNotifications(teacherId)
        .subscribe((response: any) => {
          if (response.success) {
            this.notification = response.data.reverse();
            return;
          }
        });
    }
  }

  deleteNotification(id: string) {
    this.notificationService
      .deleteNotification(id)
      .subscribe((response: any) => {
        if (response.success) {
          this.toastr.success('Notification deleted sucessfully');
        }
      });
  }
}
