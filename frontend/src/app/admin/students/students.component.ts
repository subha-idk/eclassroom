import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';
interface Student {
  _id: string;
  name: string;
  roll: string;
  section:string;
  dob:string;
  createdAt:Date;
}
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {

  searchTerm: string = ''; // Initialize search term

  students: Student[] = [];
  constructor(
    private studentService: StudentService,
    private toastr: ToastrService
  ) {
    studentService.getStudents().subscribe((response: any) => {
      if (response.success) {
        this.students =  response.data.sort((a: Student, b: Student) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      }
    });
  }

  deleteStudent(studentId: string) {
    this.studentService.deleteStudent(studentId).subscribe((response: any) => {
      if (response.success) {
        this.toastr.success(response.message);
        this.students = this.students.filter(t => t._id !== studentId).sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        this.toastr.error(response.message);
      }
    });
}
  deleteAllStudent() {
    this.studentService.deleteAllStudent().subscribe((response: any) => {
      if (response.success) {
        this.toastr.success(response.message);
        this.students =[]
      } else {
        this.toastr.error(response.message);
      }
    });
}



// Function to filter classList based on searchTerm
filterStudentList(): any[] {
  const searchTermLC = this.searchTerm.toLowerCase();
  return this.students.filter((student) =>
    this.searchFilter(student, searchTermLC)
  );
}

// Function to check if any field matches the search term
private searchFilter(student: any, searchTermLC: string): boolean {
  return (
    student.name.toLowerCase().includes(searchTermLC) ||
    student.section.toLowerCase().includes(searchTermLC) ||
    student.roll.toLowerCase().includes(searchTermLC) 
  );
}
}
