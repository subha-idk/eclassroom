import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.scss'],
})
export class RegisterTeacherComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    // Handle form submission here
    console.log(this.form.value);

    this.teacherService.addTeacher(this.form.value).subscribe((response) => {
      if (response.success) {
        this.toastr.success(response.message, '');
        this.form.reset();
      } else {
        this.toastr.error(response.message, '');
      }
    });
  }
}
