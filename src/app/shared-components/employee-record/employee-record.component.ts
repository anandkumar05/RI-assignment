import { Component, Input } from '@angular/core';
import { Role } from 'src/app/_enums/role.enum';
import { IEMPLOYEE } from 'src/app/_interfaces/employee.interface';

@Component({
  selector: 'app-employee-record',
  templateUrl: './employee-record.component.html',
  styleUrls: ['./employee-record.component.scss']
})
export class EmployeeRecordComponent {

  @Input() employee!: IEMPLOYEE;
  roleEnum: any = Role;

}
