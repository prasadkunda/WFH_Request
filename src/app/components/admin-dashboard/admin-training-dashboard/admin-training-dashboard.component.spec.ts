import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrainingDashboardComponent } from './admin-training-dashboard.component';

describe('AdminTrainingDashboardComponent', () => {
  let component: AdminTrainingDashboardComponent;
  let fixture: ComponentFixture<AdminTrainingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTrainingDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminTrainingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
