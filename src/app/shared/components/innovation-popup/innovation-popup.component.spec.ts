import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationPopupComponent } from './innovation-popup.component';

describe('InnovationPopupComponent', () => {
  let component: InnovationPopupComponent;
  let fixture: ComponentFixture<InnovationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InnovationPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InnovationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
