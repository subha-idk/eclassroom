import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ConstantsService,
  Section,
  Subject,
} from 'src/app/services/constants.service';
import {
  AttendanceService,
  AttendanceList,
} from 'src/app/services/attendance.service';
import { AttendenceTableComponent } from '../component/attendence-table/attendence-table.component';
import { Router } from '@angular/router';
import { ClassesService } from 'src/app/services/classes.service';
import { StudentService } from 'src/app/services/student.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-take-attendence',
  templateUrl: './take-attendence.component.html',
  styleUrls: ['./take-attendence.component.scss'],
})
export class TakeAttendenceComponent {
  @ViewChild(AttendenceTableComponent)
  tableComponent!: AttendenceTableComponent;

  sections!: Section[];
  subjects!: Subject[];
  attendenceArray: AttendanceList[] = [];
  selectedValue: any;
  classDetails: any;
  isFormEditable: boolean = false;

  firstFormGroup = this._formBuilder.group({
    className: ['', Validators.required],
    section: ['', Validators.required],
    classDate: ['', [Validators.required, this.dateNotInFutureValidator()]],
  });

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private constantService: ConstantsService,
    private attendenceService: AttendanceService,
    private router: Router,
    private classService: ClassesService,
    private studentService: StudentService,
    private toastr: ToastrService
  ) {
    // setting the view according to size
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    // setting the section from the services

    this.fetchSections();
    // this.sections = constantService.fetchSections();

    // this.subjects = constantService.subjectList;

    this.fetchSubjects()
  }

  fetchSections() {
    this.constantService.getSections().subscribe((data: any) => {
      // Assuming response is an array of sections with `dept` and `shift` fields
      this.sections = data.section.map((section: any) => ({
        value: section.dept + '_' + section.shift,
        viewValue: section.dept + ' ' + section.shift,
      }));
    });
  }
  fetchSubjects() {
    this.constantService.getSubjects().subscribe((data: any) => {
      // Assuming response is an array of sections with `dept` and `shift` fields
      this.subjects = data.subjects.map((subject: any) => ({
        value: subject.name ,
        viewValue:  subject.name,
      }));
    });
  }

  classeNextButtonClicked() {
    this.classDetails = this.firstFormGroup.value;

    this.studentService
      .getStudentBySection(this.classDetails.section)
      .subscribe((response) => {
        this.tableComponent.updateStudentList(response.data);
      });
  }

  attendenceNextButtonClicked() {
    this.selectedValue = this.tableComponent.submit();
  }

  onAttendenceSubmit() {
    // Check if data exists in local storage
    const data = localStorage.getItem('USER_DATA');

    if (data) {
      // Data exists in local storage

      let teacherId = JSON.parse(data).user._id;

      let classData = { teacherId, ...this.classDetails };

      this.classService.addClass(classData).subscribe((response) => {
        if (response.success) {
          let attendanceRecords = this.tableComponent.getAttendanceRecords();

          this.attendenceService
            .markAttendance(attendanceRecords, response.class._id)
            .subscribe((res: any) => {
              if (res.success) {
                this.toastr.success('Attendence Marked Successful');
              } else {
                this.toastr.error('Failed to mark Attendence');

                this.classService
                  .deleteClass(response.class._id)
                  .subscribe((res: any) => {});
              }
            });
        } else {
          this.toastr.error('Failed to create class');
        }
      });
    }
  }

  dateNotInFutureValidator() {
    return (control: any) => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();
      if (selectedDate > currentDate) {
        return { futureDate: true }; // Return an error if the date is in the future
      }
      return null; // Return null if the validation passes
    };
  }
}
