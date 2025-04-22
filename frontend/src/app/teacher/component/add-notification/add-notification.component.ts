import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { ConstantsService, Section } from 'src/app/services/constants.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss'],
})
export class AddNotificationComponent {
  notificationForm!: FormGroup;
  sections: any[] = [];

  constructor(
    private fb: FormBuilder,
    private constantService: ConstantsService,
    public modalRef: MdbModalRef<AddNotificationComponent>,
    private notificationService: NotificationsService,
    private toastr: ToastrService
  ) {
    // this.sections = constantService.sections;
    this.fetchSections();      
  }

  ngOnInit(): void {
    this.notificationForm = this.fb.group({
      section: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  get section() {
    return this.notificationForm.get('section');
  }

  get message() {
    return this.notificationForm.get('message');
  }

  onSubmit() {
    if (this.notificationForm.valid) {
      // Form is valid, do something here like submitting the data
      console.log(this.notificationForm.value);
      let userInfo = localStorage.getItem('USER_DATA');

      if (userInfo) {
        let teacherId = JSON.parse(userInfo).user._id;

        let data = { teacherId, ...this.notificationForm.value };

        console.log(data);

        this.notificationService
          .createNotification(data)
          .subscribe((response: any) => {
            if (response.success) {
              this.toastr.success('Messege sent successfully');
              this.modalRef.close(true);
              return;
            }
            this.toastr.error('failed to send notification');
          });
      }
    } else {
      // Form is invalid, show error messages or handle accordingly
      // You can mark the form controls as touched to trigger error messages
      this.notificationForm.markAllAsTouched();
    }
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
