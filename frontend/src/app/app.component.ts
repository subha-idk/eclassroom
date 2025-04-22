import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';

  constructor(private router: Router) {
    this.checkUserLogin();
  }

  checkUserLogin() {
    const tokenName = 'auth_token';
    const tokenExists = document.cookie.includes(`${tokenName}=`);

    if (!tokenExists) {
      localStorage.removeItem("USER_DATA")
      
    }

    let userInfo = localStorage.getItem('USER_DATA');

    if (userInfo) {
      let userType = JSON.parse(userInfo).user.user_type;
      if (userType === 'teacher') {
        this.router.navigate(['/teacher']);
      } else if (userType === 'student') {
        this.router.navigate(['/student']);
      } else if (userType === 'admin') {
        this.router.navigate(['/admin']);
      }

      return;
    }
    this.router.navigate(['/auth']);
    return;
  }
}
