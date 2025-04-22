import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Class } from 'src/app/services/classes.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.scss']
})
export class HomeCardsComponent {
  modalRef: MdbModalRef<ChangePasswordComponent> | null = null;

  lastClass!: Class;
  userInfo!: any;
  totalTodayClassCount: number = 0;
  totalClassCount: number = 0;

  constructor(private modalService: MdbModalService) {
    this.setUserInfo();
  }

  openModal() {
    this.modalRef = this.modalService.open(ChangePasswordComponent, {
      modalClass: 'modal-dialog-centered',
    });
  }

  setUserInfo() {
    const userInfo = localStorage.getItem('USER_DATA');

    if (userInfo) {
      this.userInfo = JSON.parse(userInfo).user;
    }
  }
}
