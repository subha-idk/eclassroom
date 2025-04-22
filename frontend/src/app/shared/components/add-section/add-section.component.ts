import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { ConstantsService } from 'src/app/services/constants.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SectionsComponent } from '../../sections/sections.component';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.scss'],
})
export class AddSectionComponent {
  sections: any[] = [];


  constructor(
    private fb: FormBuilder,
    private constantService: ConstantsService,
    public modalRef: MdbModalRef<AddSectionComponent>,
    private toastr: ToastrService
  ) {
    this.sectionForm = this.fb.group({
      dept: ['', Validators.required],
      shift: ['', Validators.required],
    });

    this.sections = constantService.sections;
  }

  sectionForm: FormGroup;

  onSubmit() {
    this.constantService
      .addSections(this.sectionForm.value)
      .subscribe((response: any) => {
        if (response.success) {
          this.toastr.success(response.message);
          // Emit an event to notify the parent component (SectionsComponent)
          this.modalRef.close(true);

          return;
        }
        this.toastr.error(response.message);
      });
  }
}
