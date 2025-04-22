import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TakeAttendenceComponent } from './take-attendance/take-attendence.component';
import { EditAttendenceComponent } from './edit-attendance/edit-attendence.component';
import { AuthGuard } from '../auth.guard';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'take-attendence',component:TakeAttendenceComponent},
  {path:'edit-attendence',component:EditAttendenceComponent},
  {path:'notifications',component:NotificationsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
