import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInnovationDashboardComponent } from './admin-innovation-dashboard.component';

describe('AdminInnovationDashboardComponent', () => {
  let component: AdminInnovationDashboardComponent;
  let fixture: ComponentFixture<AdminInnovationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInnovationDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminInnovationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
