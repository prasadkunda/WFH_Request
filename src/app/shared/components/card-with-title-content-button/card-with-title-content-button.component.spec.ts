import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWithTitleContentButtonComponent } from './card-with-title-content-button.component';

describe('CardWithTitleContentButtonComponent', () => {
  let component: CardWithTitleContentButtonComponent;
  let fixture: ComponentFixture<CardWithTitleContentButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardWithTitleContentButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardWithTitleContentButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
