import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Class, ClassesService } from 'src/app/services/classes.service';
import { ClassListViewComponent } from '../component/class-list-view/class-list-view.component';
import { HomeCardsComponent } from '../component/home-cards/home-cards.component';
import { AttendanceService } from 'src/app/services/attendance.service';
import { HomeChartViewComponent } from '../component/home-chart-view/home-chart-view.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  classList: Class[] = [];
  @ViewChild(ClassListViewComponent) HomeClassTableRef!: ClassListViewComponent;
  @ViewChild(HomeCardsComponent) HomeCardsRef!: HomeCardsComponent;
  @ViewChild(HomeChartViewComponent) HomeChartRef!: HomeChartViewComponent;

  constructor(
    private classServices: ClassesService,
    private attendenceService: AttendanceService
  ) {
    this.getClassList();
    this.getTodayAttendence()
  }

  getClassList() {
    let userInfo = localStorage.getItem('USER_DATA');
    if (userInfo) {
      let user = JSON.parse(userInfo).user;

      let teacherId = user._id;

      if (teacherId) {
        this.classServices
          .getClassesByTeacher(teacherId)
          .subscribe((response) => {
            this.classList = response.classes;
            this.HomeClassTableRef.classList = this.classList;
            this.updateAlldata();
          });
      }
    }
  }

  updateAlldata() {
    this.classList = this.HomeClassTableRef.filteredListAccordingToDates;
    this.HomeCardsRef.totalClassCount = this.classList.length;

    let today = new Date();
    // Set the time part of 'today' to midnight to compare only the date part
    today.setHours(0, 0, 0, 0);

    this.HomeCardsRef.totalTodayClassCount = this.classList.filter(
      (classItem) => {
        // Convert 'classDate' to the same format as 'today' (date with time part set to midnight)
        let classDate = new Date(classItem.classDate);
        classDate.setHours(0, 0, 0, 0);

        // Compare the timestamps of the dates
        return classDate.getTime() === today.getTime();
      }
    ).length;
  }

  getTodayAttendence() {
    let userInfo = localStorage.getItem('USER_DATA');

    if (userInfo) {
      let teacherId = JSON.parse(userInfo).user._id;
      let date = new Date();


      this.attendenceService.getParticularDateAttendence(teacherId, date).subscribe((response)=>{
        this.HomeChartRef.attendenceRecords = response;
        this.HomeChartRef.setChartData();
        
      });
    }
  }
}
