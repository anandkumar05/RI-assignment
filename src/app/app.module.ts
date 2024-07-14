import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { BreadCrumbComponent } from './shared-components/bread-crumb/bread-crumb.component';
import { EmployeeRecordComponent } from './shared-components/employee-record/employee-record.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePickerComponent } from './shared-components/date-picker/date-picker.component';
import { DatePipe } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter, MY_DATE_FORMATS } from './_configs/mat-date.config';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeFormComponent,
    EmployeeListComponent,
    BreadCrumbComponent,
    EmployeeRecordComponent,
    DatePickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatDialogModule,
  ],
  providers: [
    MatDatepickerModule,
    DatePipe,
    { provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
