import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeChartViewComponent } from './home-chart-view.component';

describe('HomeChartViewComponent', () => {
  let component: HomeChartViewComponent;
  let fixture: ComponentFixture<HomeChartViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeChartViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeChartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
