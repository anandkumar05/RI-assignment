import { Component, Inject, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DependencyService } from 'src/app/_services/dependency.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {

  selectedDate: any;
  minDate: Date | null;
  maxDate: Date | null;
  today: string = this.ds.getISODate(new Date());

  constructor(public dialogRef: MatDialogRef<DatePickerComponent>, @Inject(MAT_DIALOG_DATA) public data: DatePicker, public ds: DependencyService) {
    this.selectedDate = data.date;
    this.minDate = data.type == 'min' ? data.validateDate : null; 
    this.maxDate = data.type == 'max' ? data.validateDate : null;
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
    // this.selectedDate = `${new Date(event._d).getMonth() + 1}-${new Date(event._d).getDate()}-${new Date(event._d).getFullYear()}`;
    this.selectedDate = new Date(new Date(event._d).getFullYear(), new Date(event._d).getMonth(), new Date(event._d).getDate());
  }

}

export class DatePicker {
  constructor(public date: Date | null, public type: 'min' | 'max', public validateDate: Date | null) {
  }
}