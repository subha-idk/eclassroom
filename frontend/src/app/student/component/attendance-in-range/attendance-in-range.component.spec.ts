import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceInRangeComponent } from './attendance-in-range.component';

describe('AttendanceInRangeComponent', () => {
  let component: AttendanceInRangeComponent;
  let fixture: ComponentFixture<AttendanceInRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceInRangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceInRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
