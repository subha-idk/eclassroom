import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { HomeComponent } from './home/home.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { TodayAttendanceComponent } from './component/today-attendance/today-attendance.component';
import { AttendanceInRangeComponent } from './component/attendance-in-range/attendance-in-range.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentGraphComponent } from './component/student-graph/student-graph.component';
import { NgChartsModule  } from 'ng2-charts';
import { HomeCardsComponent } from './component/home-cards/home-cards.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { NotificationsComponent } from './notifications/notifications.component';





@NgModule({
  declarations: [
    HomeComponent,
    AttendanceComponent,
    TodayAttendanceComponent,
    AttendanceInRangeComponent,
    StudentGraphComponent,
    HomeCardsComponent,
    ChangePasswordComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule
  ]
})
export class StudentModule { }
