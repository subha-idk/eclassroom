import { Component, EventEmitter, Output } from '@angular/core';
import { Class, ClassesService } from 'src/app/services/classes.service';

@Component({
  selector: 'app-class-table',
  templateUrl: './class-table.component.html',
  styleUrls: ['./class-table.component.scss'],
})
export class ClassTableComponent {
  classList: Class[] = [];

  searchTerm: string = ''; // Initialize search term


  @Output() classTablePageDetails = new EventEmitter<{ classId: any, section: any }>();

  constructor(private classService: ClassesService) {
    // this.classList = classService.classes;
    // console.log(this.classList);
  }

  // updateClassList(newClassList: Class[]) {
  //   this.classList = newClassList;
  // }

  formatDate(dateString: Date): string {
    const newDate = new Date(dateString);
    let date = this.padZero(newDate.getDate());
    let month = this.padZero(newDate.getMonth() + 1);
    let year = this.padZero(newDate.getFullYear());
    return `${date}-${month}-${year}`;
  }

  padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }


  onShowAttendenceDetails(classId: any,section:any) {
    this.classTablePageDetails.emit({classId,section});
  }


   // Function to filter classList based on searchTerm
   filterClassList(): any[] {
    const searchTermLC = this.searchTerm.toLowerCase();
    return this.classList.filter((classItem) =>
      this.searchFilter(classItem, searchTermLC)
    );
  }

  // Function to check if any field matches the search term
  private searchFilter(classItem: any, searchTermLC: string): boolean {
    return (
      classItem.className.toLowerCase().includes(searchTermLC) ||
      classItem.section.toLowerCase().includes(searchTermLC) ||
      this.formatDate(classItem.classDate).toLowerCase().includes(searchTermLC)
    );
  }
}
