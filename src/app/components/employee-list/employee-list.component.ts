import { Component } from '@angular/core';
import { employee } from 'src/app/_datas/employee.data';
import { IEMPLOYEE } from 'src/app/_interfaces/employee.interface';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})

export class EmployeeListComponent {

  currEmpList: IEMPLOYEE[] = employee;
  prevEmpList: IEMPLOYEE[] = employee;
}
