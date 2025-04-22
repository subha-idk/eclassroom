import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAttendenceComponent } from './edit-attendence.component';

describe('EditAttendenceComponent', () => {
  let component: EditAttendenceComponent;
  let fixture: ComponentFixture<EditAttendenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAttendenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
