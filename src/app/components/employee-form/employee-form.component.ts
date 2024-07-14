import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { roles } from 'src/app/_datas/roles.data';
import { IROLE } from 'src/app/_interfaces/role.interface';
import { DependencyService } from 'src/app/_services/dependency.service';
import { DatePicker, DatePickerComponent } from 'src/app/shared-components/date-picker/date-picker.component';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})

export class EmployeeFormComponent {

  employeeForm: FormGroup;
  roles: IROLE[] = roles;
  today: string = this.ds.getISODate(new Date());

  constructor(private fb: FormBuilder, public dialog: MatDialog, private ds: DependencyService) {
    this.employeeForm = this.fb.group({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      role: new FormControl(null, Validators.required),
      joinDate: new FormControl(this.ds.getISODate(new Date()), Validators.required),
      relieveDate: new FormControl(null)
    })
  }

  get f() { return this.employeeForm.controls; }

  formSubmit() {
    console.log("i am called form submit--->>", this.employeeForm.value)
  }

  openDatePicker(type: 'joinDate' | 'relieveDate') {
    const dialogData = new DatePicker(this.employeeForm.value[type] ? this.ds.getDateStr(this.employeeForm.value[type]) : null, type == 'joinDate' ? 'max' : 'min', type == 'joinDate' ? this.employeeForm.value.relieveDate ? this.ds.getDateStr(this.employeeForm.value.relieveDate) : null : this.employeeForm.value.joinDate ? this.ds.getDateStr(this.employeeForm.value.joinDate) : null);

    const dialogRef = this.dialog.open(DatePickerComponent, {
      disableClose: true,
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.employeeForm.get(type)?.setValue(this.ds.getISODate(dialogResult));
      }
    });
  }
}
