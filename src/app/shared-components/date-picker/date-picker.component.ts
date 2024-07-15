import { Component, Inject, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DependencyService } from 'src/app/_services/dependency.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {

  selectedDate: Date | null;
  minDate: Date | null;
  maxDate: Date | null;
  today: string = this.getDates('today');
  nextMonday: string = this.getDates('monday');
  nextTuesday: string = this.getDates('tuesday');
  afterAWeek: string = this.getDates('afterAWeek');
  type: 'joinDate' | 'relieveDate';

  constructor(public dialogRef: MatDialogRef<DatePickerComponent>, @Inject(MAT_DIALOG_DATA) public data: DatePicker, public ds: DependencyService) {
    this.selectedDate = data.date;
    this.type = data.type;
    this.minDate = data.validateType == 'min' ? data.validateDate : null;
    this.maxDate = data.validateType == 'max' ? data.validateDate : null;
  }

  ngOnInit(): void {
  }

  onConfirm(): void {
    this.dialogRef.close(this.selectedDate);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  calenderChange(event: any) {
    this.selectedDate = new Date(new Date(event._d).getFullYear(), new Date(event._d).getMonth(), new Date(event._d).getDate());
  }

  getDates(type: 'today' | 'monday' | 'tuesday' | 'afterAWeek'): string {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    switch (type) {
      case 'today':
        return this.ds.getISODate(new Date());

      case 'monday':
        // Calculate days until next Monday
        const daysUntilNextMonday = (8 - dayOfWeek) % 7 || 7;
        // Create new date object for next Monday
        const nextMonday = new Date(today);
        nextMonday.setDate(today.getDate() + daysUntilNextMonday);

        return this.ds.getISODate(nextMonday);

      case 'tuesday':
        // Calculate days until next Monday
        const daysUntilNextTuesday = (9 - dayOfWeek) % 7 || 7;
        // Create new date object for next Monday
        const nextTuesday = new Date(today);
        nextTuesday.setDate(today.getDate() + daysUntilNextTuesday);

        return this.ds.getISODate(nextTuesday);

      case 'afterAWeek':
        const oneWeekLater = today;
        oneWeekLater.setDate(today.getDate() + 7);
        return this.ds.getISODate(oneWeekLater);

      default:
        return this.ds.getISODate(new Date());
    }
  }

  selectDate(type: 'today' | 'monday' | 'tuesday' | 'afterAWeek') {
    switch (type) {
      case 'today':
        this.selectedDate = this.ds.getDateStr(this.today);
        break;

      case 'monday':
        this.selectedDate = this.ds.getDateStr(this.nextMonday);
        break;

      case 'tuesday':
        this.selectedDate = this.ds.getDateStr(this.nextTuesday);
        break;

      case 'afterAWeek':
        this.selectedDate = this.ds.getDateStr(this.afterAWeek);
        break;

      default:
        this.selectedDate = null;
        break;
    }
  }

  dateValidator(dateString1: string, dateString2: string, type: 'min' | 'max'): boolean {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);
  
    return type == 'max' ? date1.getTime() > date2.getTime() : date1.getTime() < date2.getTime();
  }

}

export class DatePicker {
  constructor(public date: Date | null, public type: 'joinDate' | 'relieveDate', public validateType: 'min' | 'max', public validateDate: Date | null) {
  }
}