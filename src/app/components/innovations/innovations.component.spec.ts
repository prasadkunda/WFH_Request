import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationsComponent } from './innovations.component';

describe('InnovationsComponent', () => {
  let component: InnovationsComponent;
  let fixture: ComponentFixture<InnovationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InnovationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InnovationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
