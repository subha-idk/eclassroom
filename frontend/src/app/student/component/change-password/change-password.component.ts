import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/services/student.service';
import { EditDetailsComponent } from 'src/app/teacher/component/edit-details/edit-details.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  changePasswordForm!: FormGroup;

  constructor(
    public modalRef: MdbModalRef<EditDetailsComponent>,
    private formBuilder: FormBuilder,
    private studentService:StudentService,
    private toastr:ToastrService
  ) {
    this.changePasswordForm = this.formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get passwordsMatch(): boolean {
    const Password = this.changePasswordForm.get('password')?.value;
    const newPassword = this.changePasswordForm.get('newPassword')?.value;
    return Password === newPassword;
  }

  submitForm() {
    // Submit form logic goes here

    let userInfo = localStorage.getItem('USER_DATA');

    if (userInfo) {
      let studentId = JSON.parse(userInfo).user._id;
      this.studentService.updateStudent({password:this.changePasswordForm.value.password},studentId).subscribe((response:any)=>{
        if(response.success){
             this.toastr.success("Password change successfully!!")
             return
        }
        this.toastr.error("failed to change password")

      })

    }

    this.modalRef.close();
  }
}
