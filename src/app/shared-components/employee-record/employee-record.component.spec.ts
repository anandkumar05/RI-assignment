import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRecordComponent } from './employee-record.component';

describe('EmployeeRecordComponent', () => {
  let component: EmployeeRecordComponent;
  let fixture: ComponentFixture<EmployeeRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeRecordComponent]
    });
    fixture = TestBed.createComponent(EmployeeRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
