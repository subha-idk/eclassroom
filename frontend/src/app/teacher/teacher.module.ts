import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { HomeComponent } from './home/home.component';
import { TakeAttendenceComponent } from './take-attendance/take-attendence.component';
import { EditAttendenceComponent } from './edit-attendance/edit-attendence.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import { AttendenceTableComponent } from './component/attendence-table/attendence-table.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ClassTableComponent } from './component/class-table/class-table.component';
import {MatIconModule} from '@angular/material/icon';
import { HomeCardsComponent } from './component/home-cards/home-cards.component';
import { NgChartsModule  } from 'ng2-charts';
import { HomeChartViewComponent } from './component/home-chart-view/home-chart-view.component';
import { ClassListViewComponent } from './component/class-list-view/class-list-view.component';
import { EditDetailsComponent } from './component/edit-details/edit-details.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { NotificationsComponent } from './notifications/notifications.component';
import { AddNotificationComponent } from './component/add-notification/add-notification.component';


@NgModule({
  declarations: [
    HomeComponent,
    TakeAttendenceComponent,
    EditAttendenceComponent,
    AttendenceTableComponent,
    ClassTableComponent,
    HomeCardsComponent,
    HomeChartViewComponent,
    ClassListViewComponent,
    EditDetailsComponent,
    NotificationsComponent,
    AddNotificationComponent,
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    NgChartsModule,
    MdbModalModule,
    MdbFormsModule,
    
  ],
  providers: [ ],
})
export class TeacherModule { }
