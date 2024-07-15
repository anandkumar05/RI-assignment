import { Component } from '@angular/core';
import { IEMPLOYEE } from 'src/app/_interfaces/employee.interface';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})

export class EmployeeListComponent {

  currEmpList!: IEMPLOYEE[];
  prevEmpList!: IEMPLOYEE[];
  employeeList: IEMPLOYEE[] = this.storage.getEmployeeList();

  constructor(private storage: StorageService) {
    
  }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.currEmpList = this.employeeList.filter(emp => !emp.relieveDate);
    this.prevEmpList = this.employeeList.filter(emp => emp.relieveDate);
  }

  deleteEmployee(id: string) {
    const employeeList: IEMPLOYEE[] = this.storage.getEmployeeList();
    const index = this.employeeList.findIndex(emp => emp.id == id);
    if (index !== -1) {
      this.employeeList.splice(index, 1);
    }
    this.storage.setEmployeeList(this.employeeList);
    this.employeeList = this.storage.getEmployeeList();
    this.getEmployeeList()
  }
}
