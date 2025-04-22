import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceTableComponent } from './attendence-table.component';

describe('AttendenceTableComponent', () => {
  let component: AttendenceTableComponent;
  let fixture: ComponentFixture<AttendenceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendenceTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendenceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
