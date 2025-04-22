import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss'],
})
export class EditDetailsComponent {
  changePasswordForm!: FormGroup;
  constructor(
    public modalRef: MdbModalRef<EditDetailsComponent>,
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private toastr: ToastrService
  ) {
    this.changePasswordForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });


    this.getDataFromLocalStorage();
    
  }

  submitForm() {
    // Submit form logic goes here
    console.log(this.changePasswordForm.value); // Example: Log form data to console

    let userInfo = localStorage.getItem('USER_DATA');

    if (userInfo) {
      let teacherId = JSON.parse(userInfo).user._id;

      this.teacherService
        .updateTeacher(this.changePasswordForm.value, teacherId)
        .subscribe((response) => {
          if (response.success) {
            this.toastr.success('Data Updated Successfully');
            this.saveDataToLocalStorage(response.data);
          } else {
            this.toastr.error('Data Updation failed');
          }
        });
    }

    this.modalRef.close();
  }

  get passwordsMatch(): boolean {
    const Password = this.changePasswordForm.get('password')?.value;
    const newPassword = this.changePasswordForm.get('newPassword')?.value;
    return Password === newPassword;
  }

  getDataFromLocalStorage() {
    let userInfo = localStorage.getItem('USER_DATA');
    if (userInfo) {
      let data = JSON.parse(userInfo);

      // Use patchValue to update the form controls
    this.changePasswordForm.patchValue({
      name: data.user.name,
      email: data.user.email
    });

    }
  }

  saveDataToLocalStorage(user: any) {
    let userInfo = localStorage.getItem('USER_DATA');
    if (userInfo) {
      let data = JSON.parse(userInfo);

      data.user.name = user.name;
      data.user.email = user.email;

      let toSaveData = JSON.stringify(data);

      localStorage.setItem('USER_DATA', toSaveData);
    }
  }
}
