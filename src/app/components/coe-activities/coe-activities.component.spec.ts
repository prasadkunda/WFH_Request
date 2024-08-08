import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoeActivitiesComponent } from './coe-activities.component';

describe('CoeActivitiesComponent', () => {
  let component: CoeActivitiesComponent;
  let fixture: ComponentFixture<CoeActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoeActivitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoeActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
