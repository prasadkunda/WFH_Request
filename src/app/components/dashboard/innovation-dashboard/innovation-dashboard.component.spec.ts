import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationDashboardComponent } from './innovation-dashboard.component';

describe('InnovationDashboardComponent', () => {
  let component: InnovationDashboardComponent;
  let fixture: ComponentFixture<InnovationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InnovationDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InnovationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
