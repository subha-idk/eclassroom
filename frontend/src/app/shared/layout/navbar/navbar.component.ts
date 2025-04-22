import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
 isLoggedIn: boolean = false

 constructor(private router:Router){
this.checkLogin()
 }

 checkLogin(){
  let userInfo = localStorage.getItem('USER_DATA');

    if (userInfo) {
      let userType = JSON.parse(userInfo).user;
      if(userType){
        this.isLoggedIn = true
        return
      }
      this.isLoggedIn = false
      return

    }
 }

 logout(){
  localStorage.removeItem("USER_DATA");
  window.location.reload()
 }
}
