import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { ConstantsService } from 'src/app/services/constants.service';
import { AddSectionComponent } from '../components/add-section/add-section.component';
import { AddSubjectComponent } from '../components/add-subject/add-subject.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent {

  subjects : {
    _id:string,
    name:string
  }[] = []

  modalRef: MdbModalRef<AddSubjectComponent> | null = null;

  constructor(private modalService: MdbModalService,private constantServices:ConstantsService,private toastr:ToastrService) {
    this.makeRequest()
  }

  openModal() {
    this.modalRef = this.modalService.open(AddSubjectComponent)
    this.modalRef.onClose.subscribe((canUpdate: any) => {
      if(canUpdate){
        this.makeRequest()
      }
    });
  }

  makeRequest(){
   this.constantServices.getSubjects().subscribe((response:any)=>{
    if(response.success){
      this.subjects = response.subjects;
    }
   })
  }

  deleteSubject(id:string){
         this.constantServices.deleteSubject(id).subscribe((response:any)=>{
          
          if(response.success){
            this.makeRequest()
            this.toastr.success("Subject deleted sucessfully")
          }
         })
  }
}
