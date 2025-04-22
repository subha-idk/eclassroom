import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable, map } from 'rxjs';
import {
  AttendanceList,
  AttendanceService,
} from 'src/app/services/attendance.service';
import { Section, ConstantsService } from 'src/app/services/constants.service';
import { AttendenceTableComponent } from '../component/attendence-table/attendence-table.component';
import { ClassTableComponent } from '../component/class-table/class-table.component';
import { Class, ClassesService } from 'src/app/services/classes.service';
import { MatStepper } from '@angular/material/stepper';
import { StudentService } from 'src/app/services/student.service';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
// import { jsPDF } from 'jspdf';


@Component({
  selector: 'app-edit-attendence',
  templateUrl: './edit-attendence.component.html',
  styleUrls: ['./edit-attendence.component.scss'],
})
export class EditAttendenceComponent {
  @ViewChild(AttendenceTableComponent)
  attendenceTable!: AttendenceTableComponent;

  @ViewChild(ClassTableComponent)
  classtableComponent!: ClassTableComponent;

  @ViewChild(MatStepper) stepper!: MatStepper;

  sections!: Section[];
  attendanceRecords: any = [];
  studentList: AttendanceList[] = [];
  isFormEditable: boolean = false;
  classList: Class[] = [];
  combinedList: AttendanceList[] = [];
  classId!: string;
  attendenceId!: string;

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    breakpointObserver: BreakpointObserver,
    private constantService: ConstantsService,
    private attendenceService: AttendanceService,
    private classServices: ClassesService,
    private studentService: StudentService,
    private toastr: ToastrService
  ) {
    // setting the view according to size
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    // setting the section from the services

    this.sections = constantService.sections;

    // this.stepper.linear = true
  }

  ngOnInit() {
    this.getClassList();
  }


 

  attendenceNextButtonClicked() {
  
  }

  onAttendenceSubmit() {
    let attendanceData = this.attendenceTable.getAttendanceRecords();

    this.attendenceService
      .updateAttendence(this.attendenceId, {
        attendanceRecords: attendanceData,
        classId: this.classId,
      })
      .subscribe((res: any) => {
        if (res.success) {
          this.toastr.success('Attendance Updated Successful');
        } else {
          this.toastr.error('Failed to update Attendance');
        }
      });

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
            this.classtableComponent.classList = this.classList;
          });
      }
    }
  }

  onShowDetails(data: any) {
    this.stepper.next();

    this.classId = data.classId;

    this.attendenceService
      .getParticularClassAttendence(data.classId)
      .subscribe((response) => {
        if (response.success) {
          this.attendenceId = response.data._id;

          this.attendanceRecords = response.data.attendanceRecords;

          this.studentService
            .getStudentBySection(data.section)
            .subscribe((response) => {
              this.studentList = response.data;

              this.attendenceTable.updateStudentList(
                this.combineStudentListWithAttendance()
              );
            });
        }
      });
  }

  combineStudentListWithAttendance() {
    this.combinedList = [];
    // Iterate over student list
    for (const student of this.studentList) {
      // Find corresponding attendance record
      const attendanceRecordIndex = this.attendanceRecords.findIndex(
        (record: any) => record.studentId === student._id
      );

      // If attendance record found, update its status
      if (attendanceRecordIndex !== -1) {
        this.combinedList.push({
          _id: student._id,
          name: student.name,
          roll: student.roll,
          isPresent:
            this.attendanceRecords[attendanceRecordIndex].attendanceStatus ==
            'present'
              ? true
              : false,
        });
      }
    }
    return this.combinedList;
  }




  printAttendance() {

    let attendanceData = this.attendenceTable.getAttendanceRecords();


    


    const className = this.classList.find(cls => this.classId==cls._id)

    
    
    
    
    
    const section = className?.section; // Assuming classId contains the section info
    const subject = className?.className; // Replace this with the actual subject name
    const date = className?.classDate //  date in YYYY-MM-DD format
 
    let formattedDate:string = new Date() +"";


    if (date) {
      const dateObj = new Date(date);
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const year = dateObj.getFullYear();
    
       formattedDate = `${day}-${month}-${year}`;
    } else {
    }

    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text(`${section} - ${subject} Attendance`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${formattedDate}`, 20, 30);

    // Attendance Table Headers
    doc.setFontSize(12);
    doc.text('S.No', 20, 40);
    doc.text('Roll No - ', 40, 40);
    doc.text('Student Name', 80, 40);
    doc.text('Status', 150, 40);

    // Attendance Data
    let yPosition = 50;
    let serialNumber = 1;

    this.combinedList.forEach((student) => {
      const isPresent = student.isPresent ? 'Present' : 'Absent';

      doc.text(`${serialNumber}`, 20, yPosition);
      doc.text(student.roll, 40, yPosition);
      doc.text(student.name, 80, yPosition);
      doc.text(isPresent, 150, yPosition);

      yPosition += 10;
      serialNumber++;
    });

    // Save the PDF
    const fileName = `${section}-${subject}-${formattedDate}.pdf`;
    doc.save(fileName);
  }
}
