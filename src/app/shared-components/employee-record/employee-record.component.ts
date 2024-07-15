import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role } from 'src/app/_enums/role.enum';
import { IEMPLOYEE } from 'src/app/_interfaces/employee.interface';
import { AlertComponent, AlertDialog } from '../alert/alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-record',
  templateUrl: './employee-record.component.html',
  styleUrls: ['./employee-record.component.scss']
})
export class EmployeeRecordComponent {

  @Input() employee!: IEMPLOYEE;
  roleEnum: any = Role;
  @Output() deleteEvent = new EventEmitter<string>();

  constructor(public dialog: MatDialog) {

  }

  deleteEmployee(id: string) {
    const dialogData = new AlertDialog('Are you sure, Do you want to delete this employee?');
    const dialogRef = this.dialog.open(AlertComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteEvent.emit(id);
      }
    });
  }
}
