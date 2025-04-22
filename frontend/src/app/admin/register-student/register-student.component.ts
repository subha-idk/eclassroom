import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConstantsService,Section } from 'src/app/services/constants.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss']
})
export class RegisterStudentComponent {
  form!: FormGroup;
  sections!: Section[] ; // Example array of sections



  constructor(private formBuilder: FormBuilder,private constantService:ConstantsService,private studentService:StudentService,private toastr:ToastrService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      roll: ['', Validators.required],
      password: ['', Validators.required],
      section: ['', Validators.required] // Added Section selection field
    });


    // setting the sections
    // this.sections = this.constantService.sections;

    this.fetchSections()
  }

  onSubmit() {
    // Handle form submission here
    console.log(this.form.value)
    // this.form.reset();

    this.studentService.addStudent(this.form.value).subscribe((response)=>{
      if(response.success){
           this.toastr.success(response.message,"");
           this.form.reset();
      }else{
           this.toastr.error(response.message,"")
             
      }
      
    })
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
}
