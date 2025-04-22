import { Component } from '@angular/core';
import { AddSectionComponent } from '../components/add-section/add-section.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent {
  sections: {
    _id: string;
    dept: string;
    shift: string;
  }[] = [];

  modalRef: MdbModalRef<AddSectionComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private constantServices: ConstantsService,
    private toastr: ToastrService
  ) {
    this.makeRequest();
  }

  openModal() {
    this.modalRef = this.modalService.open(AddSectionComponent);
    this.modalRef.onClose.subscribe((canUpdate: any) => {
      if(canUpdate){
        this.makeRequest()
      }
    });
  }

  makeRequest() {
    this.constantServices.getSections().subscribe((response) => {
      if (response.success) {
        this.sections = response.section;
      }
    });
  }

  deleteSection(id: string) {
    this.constantServices.deleteSection(id).subscribe((response: any) => {
      if (response.success) {
        this.toastr.success('Section deleted sucessfully');
        this.makeRequest();
      }
    });
  }
}
