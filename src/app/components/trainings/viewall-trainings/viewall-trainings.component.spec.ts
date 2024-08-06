import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallTrainingsComponent } from './viewall-trainings.component';

describe('ViewallTrainingsComponent', () => {
  let component: ViewallTrainingsComponent;
  let fixture: ComponentFixture<ViewallTrainingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewallTrainingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewallTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
