import { Injectable } from '@angular/core';
import { IEMPLOYEE } from '../_interfaces/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public setEmployeeList(data: IEMPLOYEE[]): void {
    localStorage.setItem('employeeList', JSON.stringify(data));
  }

  public getEmployeeList(): IEMPLOYEE[] {
    return JSON.parse(localStorage.getItem('employeeList') || '[]')!;
  }
}
