import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent {
  // sections: any[] = [];

  constructor(
    private fb: FormBuilder,
    private constantService: ConstantsService,
    public modalRef: MdbModalRef<AddSubjectComponent>,
    private toastr: ToastrService
  ) {

    this.subjectForm = this.fb.group({
      name: ['', Validators.required],
    });


    // this.sections = constantService.sections;
  }

  subjectForm: FormGroup;



  
 



  onSubmit() {
    this.constantService.addSubjects(this.subjectForm.value).subscribe((response:any)=>{
        if(response.success){
          this.toastr.success(response.message)
          this.modalRef.close(true)
          return
        }
        this.toastr.error(response.message)

    })
  }
}
