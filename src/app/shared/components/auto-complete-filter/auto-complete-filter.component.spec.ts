import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteFilterComponent } from './auto-complete-filter.component';

describe('AutoCompleteFilterComponent', () => {
  let component: AutoCompleteFilterComponent;
  let fixture: ComponentFixture<AutoCompleteFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoCompleteFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoCompleteFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
