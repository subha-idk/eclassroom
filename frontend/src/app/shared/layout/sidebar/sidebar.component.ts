import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  userType: string = 'admin';

  constructor() {
    this.checkUserType();
  }

  checkUserType() {
    let userInfo = localStorage.getItem('USER_DATA');

    if (userInfo) {
      let userType = JSON.parse(userInfo).user.user_type;
      if (userType === 'teacher') {
        this.userType = 'teacher';
      } else if (userType === 'student') {
        this.userType = 'student';
      } else if (userType === 'admin') {
        this.userType = 'admin';
      }

      return;
    }
  }
}
