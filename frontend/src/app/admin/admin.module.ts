import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeachersComponent } from './teachers/teachers.component';
import { StudentsComponent } from './students/students.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';


@NgModule({
  declarations: [
    HomeComponent,
    RegisterTeacherComponent,
    RegisterStudentComponent,
    TeachersComponent,
    StudentsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MdbFormsModule
  ]
})
export class AdminModule { }
