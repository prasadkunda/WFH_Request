import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFiltersComponent } from './text-filters.component';

describe('TextFiltersComponent', () => {
  let component: TextFiltersComponent;
  let fixture: ComponentFixture<TextFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
