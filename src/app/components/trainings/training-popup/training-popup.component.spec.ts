import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPopupComponent } from './training-popup.component';

describe('TrainingPopupComponent', () => {
  let component: TrainingPopupComponent;
  let fixture: ComponentFixture<TrainingPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
