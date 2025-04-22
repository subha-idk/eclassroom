import { Component } from '@angular/core';
import { Class } from 'src/app/services/classes.service';

@Component({
  selector: 'app-class-list-view',
  templateUrl: './class-list-view.component.html',
  styleUrls: ['./class-list-view.component.scss'],
})
export class ClassListViewComponent {
  classList: Class[] = [];

  formatDate(dateString: Date): string {
    // Create a new Date object from the given date string
    const date = new Date(dateString);

    // Extract date components
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-based, so add 1
    const day = date.getDate();

    // Create formatted date string
    const formattedDate = `${this.padZero(day)}/${this.padZero(month)}/${year}`;

    return formattedDate;
  }

  padZero(num: number): string {
    // Add leading zero if number is less than 10
    return num < 10 ? `0${num}` : `${num}`;
  }

  compareDates(dateStr1: Date, dateStr2: Date): number {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
    return date2.getTime() - date1.getTime();
  }

  get filteredListAccordingToDates() {
    return this.classList.sort((a, b) =>
      this.compareDates(a.classDate, b.classDate)
    );
  }
}
