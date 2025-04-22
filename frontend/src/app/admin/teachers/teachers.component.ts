import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TeacherService } from 'src/app/services/teacher.service';
interface Teacher {
  _id: string;
  name: string;
  email: string;
  createdAt:Date;
}
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
})
export class TeachersComponent {
  teachers: Teacher[] = [];
  constructor(
    private teacherService: TeacherService,
    private toastr: ToastrService
  ) {
    teacherService.getTeachers().subscribe((response: any) => {
      if (response.success) {
        this.teachers = response.data.sort((a: Teacher, b: Teacher) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    });
  }

  deleteTeacher(teacherId: string) {
    this.teacherService.deleteTeacher(teacherId).subscribe((response: any) => {
      if (response.success) {
        this.toastr.success(response.message);
        this.teachers = this.teachers.filter(t => t._id !== teacherId).sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        this.toastr.error(response.message);
      }
    });
  }

  deleteAllTeacher() {
    this.teacherService.deleteAllTeacher().subscribe((response: any) => {
      if (response.success) {
        this.toastr.success(response.message);
        this.teachers = [];
      } else {
        this.toastr.error(response.message);
      }
    });
  }
}
