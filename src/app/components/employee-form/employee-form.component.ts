import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { noNumbersOrSpecialChars, notOnlyWhitespace } from 'src/app/_configs/validators.config';
import { roles } from 'src/app/_datas/roles.data';
import { IEMPLOYEE } from 'src/app/_interfaces/employee.interface';
import { IROLE } from 'src/app/_interfaces/role.interface';
import { DependencyService } from 'src/app/_services/dependency.service';
import { StorageService } from 'src/app/_services/storage.service';
import { DatePicker, DatePickerComponent } from 'src/app/shared-components/date-picker/date-picker.component';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})

export class EmployeeFormComponent implements OnInit {

  employeeForm: FormGroup;
  roles: IROLE[] = roles;
  today: string = this.ds.getISODate(new Date());
  unSubscribe$ = new Subject();
  employeeId: string = '';

  constructor(private fb: FormBuilder, private dialog: MatDialog, private ds: DependencyService, private activeRoute: ActivatedRoute, private storage: StorageService, private router: Router) {
    this.employeeForm = this.fb.group({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100), notOnlyWhitespace(), noNumbersOrSpecialChars()]),
      role: new FormControl(null, Validators.required),
      joinDate: new FormControl(this.ds.getISODate(new Date()), Validators.required),
      relieveDate: new FormControl(null)
    })
  }

  get f() { return this.employeeForm.controls; }

  ngOnInit(): void {
    this.getParamsData();
  }

  getParamsData() {
    this.activeRoute.paramMap.pipe(takeUntil(this.unSubscribe$)).subscribe((data: Params) => {
      this.employeeId = data.params['id'];
      if (this.employeeId) {
        this.getEmployee(data.params['id']);
      }
    });
  }

  getEmployee(id: string) {
    let empList: IEMPLOYEE[] = this.storage.getEmployeeList();
    const employee = empList.find(x => x.id == id);
    employee && this.employeeForm.patchValue(employee);
  }

  openDatePicker(type: 'joinDate' | 'relieveDate') {
    const dialogData = new DatePicker(this.employeeForm.value[type] ? this.ds.getDateStr(this.employeeForm.value[type]) : null,type, type == 'joinDate' ? 'max' : 'min', type == 'joinDate' ? this.employeeForm.value.relieveDate ? this.ds.getDateStr(this.employeeForm.value.relieveDate) : null : this.employeeForm.value.joinDate ? this.ds.getDateStr(this.employeeForm.value.joinDate) : null);

    const dialogRef = this.dialog.open(DatePickerComponent, {
      disableClose: true,
      width: '400px',
      minWidth: "300px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult != false) {
        this.employeeForm.get(type)?.setValue(dialogResult ? this.ds.getISODate(dialogResult) : null);
      }
    });
  }

  formSubmit() {
    this.employeeId ? this.updateEmployee(this.employeeId) : this.createEmployee();
  }

  createEmployee() {
    const id = this.ds.generateId();
    this.employeeForm.get('id')?.setValue(id);
    let empList: IEMPLOYEE[] = this.storage.getEmployeeList();
    empList.push(this.employeeForm.value);
    this.storage.setEmployeeList(empList);
    this.router.navigate(['/']);
  }

  updateEmployee(id: string) {
    let empList: IEMPLOYEE[] = this.storage.getEmployeeList();
    let newEmpList = empList.map(emp => emp.id == id ? this.employeeForm.value : emp);
    this.storage.setEmployeeList(newEmpList);
    this.router.navigate(['/']);
  }

  ngOnDelete() {
    this.unSubscribe$.unsubscribe();
  }
}
